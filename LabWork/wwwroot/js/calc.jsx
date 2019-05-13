var Table = ReactBootstrap.Table;
var Button = ReactBootstrap.Button;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var HelpBlock = ReactBootstrap.HelpBlock;
var ControlLabel = ReactBootstrap.ControlLabel;

var Panel = ReactBootstrap.Panel;
var PanelHeading = ReactBootstrap.Panel.Heading;
var PanelBody = ReactBootstrap.Panel.Body;

var Modal = ReactBootstrap.Modal;
var ModalHeader = ReactBootstrap.Modal.Header;
var ModalTitle = ReactBootstrap.Modal.Title;
var ModalBody = ReactBootstrap.Modal.Body;
var ModalFooter = ReactBootstrap.Modal.Footer;
var { Nav, NavItem } = ReactBootstrap;

var  {ButtonToolbar, OverlayTrigger, Tooltip} = ReactBootstrap;

var fileArray = [];
var regions = [
    "01 Республика Адыгея",
    "02 Республика Башкортостан",  
    "03 Республика Бурятия",
    "04 Республика Алтай",
    "05 Республика Дагестан",
    "06 Республика Ингушетия",
    "07 Кабардино-Балкарская Республика",                    
    "08 Республика Калмыкия",                                      
    "09 Карачаево-Черкесская Республика",
    "10 Республика Карелия",
    "11 Республика Коми",
    "12 Республика Мария Эл",
    "13 Республика Мордовия",
    "14 Республика Саха (Якутия)",
    "15 Республика Северная Осетия",
    "16 Республика Татарстан",
    "17 Республика Тыва",
    "18 Республика Удмуртская Республика",
    "19 Республика Хакассия",
    "20 Чеченская Республика",
    "21 Чувашская Республика",
    "22 Алтайский край",
    "23 Краснодарский край",
    "24 Красноярский край",
    "25 Приморский край",
    "26 Ставропольский край",
    "27 Хабаровский край",
    "28 Амурская область",
    "29 Архангельская область",
    "30 Астраханская область",
    "31 Белгородская область",
    "32 Брянская область",
    "33 Владимирская область",
    "34 Волгоградская область",
    "35 Вологодская область",
    "36 Воронежская область",
    "37 Ивановская область",
    "38 Иркутская область",
    "39 Калининградская область",
    "40 Калужская область",
    "41 Камчатская область",
    "42 Кемеровская область",
    "43 Кировская область",
    "44 Костромская область",
    "45 Курганская область",
    "46 Курская область",
    "47 Ленинградская область",
    "48 Липецкая область",
    "49 Магаданская область",
    "50 Московская область",
    "51 Мурманская область",
    "52 Нижегородская область",
    "53 Новгородская область",
    "54 Новосибирская область",
    "55 Омская область",
    "56 Оренбургская область",
    "57 Орловская область",
    "58 Пензенская область",
    "59 Пермская область",
    "60 Псковская область",
    "61 Ростовская область",
    "62 Рязанская область",
    "63 Самарская область",
    "64 Саратовская область",
    "65 Сахалинская область",
    "66 Свердловская область",
    "67 Смоленская область",
    "68 Тамбовская область",
    "69 Тверская область",
    "70 Томская область",
    "71 Тульская область",
    "72 Тюменская область",
    "73 Ульяновская область",
    "74 Челябинская область",
    "75 Забайкальский край",
    "76 Ярославская область",
    "77 город Москва",
    "78 город Санкт- Петербург",
    "79 Еврейская АО",
    "80 Агинский Бурятский АО",
    "83 Ненецкий АО",
    "86 Ханты-Мансийский АО",
    "87 Чукотский АО",
    "89 Ямало-Ненецкий АО",
    "91 Симферополь",
    "92 Севастополь",
    "99 Байконур"
];

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const props = {};

        for (let key in nextProps) {
            if (nextProps[key] !== this.state[key]) {
                props[key] = nextProps[key];
            }

            this.setState(props);
        }
    }
    handleClose = () => {
        this.setState({
            show: false
        });
		setTimeout(this.props.onShowChange(false), 50);
    }
    render () {
        return (
            <div>
                <Modal className="modal" show={this.state.show} onHide={this.handleClose}>
                    <ModalHeader closeButton>
                        <ModalTitle>Произошла ошибка</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        {this.props.message}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleClose}>Закрыть</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

class ContentCalc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            filesLength: 0,
            name: '',
            message: '',
            statementInfo: {
                datesInStatement: 
				{
					period : [],
					lastMonth : ""
				},				
                restoreDocuments: [],
				lastMonthDocuments: [],
                organization: [],
                topCustomers: {
					list: []
				},
                topProviders: {
					list: []
				}
            },
            visible: false,
            error: "",
            showAlert: false
        };
    }

    onFileSubmit = (e) => {
        e.preventDefault();       
        var files = JSON.stringify({
            "Base64Content": this.state.files
        });
        var xhr = new XMLHttpRequest();
        xhr.open("post", this.props.apiUrlUpload, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(files);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    this.setState({
                        statementInfo : data,
                        visible: true,
                        showAlert: false
                    });
                }
                if (xhr.status === 400) {
                    this.setErrorMessage(xhr.responseText);
                }
            }
        };
    }

    onChangeFile = (e) => {
        fileArray = [];
        let filesLength = e.target.files.length; 
        let files = e.target.files;
        for (let i = 0; i < filesLength; i++)
        {		
			console.log(files[i].type);

			if (files[i].type == "text/plain")
			{
				this.toBase64(files[i], i);
			} else {
				this.setErrorMessage("Некорретный тип файла. Выписка должна быть в формате 1С с типом файла .*txt");
			}            
        }
        this.setState({
            files: fileArray,
            filesLength: filesLength			
        });
    }

    toBase64 = (file, i) => {
        var reader = new FileReader();
        reader.onloadend = function () {
			fileArray[i] = reader.result.replace("data:text/plain;base64,", "");		
        };
		if(file) {
			reader.readAsDataURL(file);
		}
	}
	
	setErrorMessage = (value) => {
        this.setState({
            error: value,
            showAlert: true
        });
    }

    onMoreLoadClick = () =>
    {
        this.setState({
            visible: false
        });
    }
	onShowChange = (value) => {
		if(value !== null)
		{
			this.setState({
				showAlert: value
			});
		}

	}

    render() {
        return (
            <div className="content" style={{ marginTop: '5px', padding: "10px 30px" }}>                
                <div className={"load" + (this.state.visible ? '' : '_on')}>
				<h1>Расчёт операций в банковской выписке</h1>
                    <p>Для начала работы нужно загрузить выписку(ки) из Интернет-Банка</p>
                    <form onSubmit={this.onFileSubmit} enctype="multipart/form-data" style={{ marginBottom: "10px" }}>
                        <FormGroup>
                            <FormControl
                                type="file"
                                id="file"
                                name="file"
                                accept=".txt"
                                onChange={this.onChangeFile}
                                multiple
                            />
                            <HelpBlock>Выписка должна быть в формате 1С с типом файла .*txt</HelpBlock>
                        </FormGroup>
                        <Button bsStyle="primary" type="submit" disabled={this.state.filesLength===0}>Загрузить</Button>
                    </form>
                </div>
                <div className={"load" + (this.state.visible ? '_on' : '')} style={{ marginBottom: "10px" }}>
                    <Button bsStyle="primary" onClick={this.onMoreLoadClick}>Загрузить другие файлы</Button>
                </div>
                <Restore
                    regions={regions}
                    urlApiRestore="calc/api/restore"
					urlCurrentPrice = "calc/api/current"
                    statementInfo = {this.state.statementInfo}
                    visible={this.state.visible}
                />
                <Alert
                    message={this.state.error}
                    show={this.state.showAlert}
					onShowChange = {this.onShowChange}
                />
            </div>
        );
    }
}

class Restore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: "",
            taxactionSystem: "",
            employers: 0,
            director: 0,
			kkm: 0,
            cashbox: 0,
            cashboxDoc: 0,
            cashboxCloseDoc: 0,
            month: 0,
            documents: 0,
			lastMonthDocument: 0,
            restorePrice: 0,
			currentPrice: 0,
            visible: false,
            monthVisible: false,
            marker: true,
            validEmployers: true,
            validEmployersMessage: "",
            validMonth: true,
            validMonthMessage:"",
			activeNav: "1",
			activeTopNav: "1",
			restoreVisible: true,
			lastMonthVisible: false,
			providersVisible: true,
			customersVisible: false
		};
    }
	
	componentWillReceiveProps (nextProps){
		if(this.props.statementInfo !== nextProps.statementInfo)
		{
			var restoreDocs = this.calculateInitRestoreDocs(nextProps.statementInfo);
			var lastMonthDocs = this.calculateInitLastMonthDocs(nextProps.statementInfo);
			var newMonth = nextProps.statementInfo.datesInStatement.period.monthCount;
			this.setState ({
								region: "",
								taxactionSystem: "",
								marker: false,
								visible: false,
								employers: 0,
								kkm: 0,
								director: 0,
								cashbox: 0,
								cashboxDoc: 0,
								monthVisible: false,
								documents: restoreDocs,
								lastMonthDocument : lastMonthDocs,
								month: newMonth
							});
		}
	}
	
    onRegionChange = (e) => {
        this.setState({
            region: e.target.value,
            marker: true
        });
		
        setTimeout(this.reCalculate, 50);
    }
	
    onTaxactionSystemChange = (e) => {
        this.setState({
            taxactionSystem: e.target.value,
            marker: true
        });
        setTimeout(this.reCalculate, 50);
        
    }

    onKkmChange = (e) => {  
        let kkm = e.target.value;
        if ( kkm == 1 ) {
            this.setState({                
                monthVisible: true,
                marker: true,
				kkm: 1
            });
        } else {
            this.setState({                
                monthVisible: false,
                marker: true,
				kkm: 0
            });
        }
		
        setTimeout(this.reCalculate, 100);
    }
	
    onDirectorChange = (e) => {
        
        let dir = e.target.value;
        if ( dir == 1 ) {
            this.setState({
                director: 1,
                marker:true
            });
        } else {
            this.setState({
                director: 0,
                marker: true
            });
        } 
		
        setTimeout(this.reCalculate, 100);
    }
	
    onEmployersChange = (e) => {
        var employers = e.target.value;
        var length = employers.length;
        this.setState({
            employers: parseInt(employers),
            marker: true
        });
        if (length === 0) {
            this.setState({
                validEmployers: false,
                validEmployersMessage:"Поле не может быть пустым"
            });
        }
        if (length > 0) {
            this.setState({
                validEmployers: true,
                validEmployersMessage: ""
            });
            setTimeout(this.reCalculate, 100);
        }
    }
    onChangeMonth = (e) => {
        var newMonth = e.target.value;
        var length = newMonth.length;
        this.setState({
            month: parseInt(newMonth),
            marker:true
        });
        if (length === 0) {
            this.setState({
                validMonth: false,
                validMonthMessage: "Поле не может быть пустым"
            });
        }
        if (length > 0) {
            this.setState({
                validMonth: true,
                validMonthMessage: ""
            });
			setTimeout(this.reCalculate, 100);
        }
    }
    
    reCalculate = () => {
        if (this.state.taxactionSystem !== "") {
            if (this.state.region !== "") {
                if(this.state.validEmployers&&this.state.validMonth){
                    if (this.state.marker) {
                        this.onRestorePriceRequest();
						this.onCurrentPriceRequest();
                        this.setState({
                            marker: false
                        });
                    }
                }
            }
        }
    }

    onRestorePriceRequest = () => {
		setTimeout(this.restoreRequest, 50);
    }
	
	onCurrentPriceRequest = () => {
		setTimeout(this.currentRequest, 50);
    }

	validParams = () => {
		return (this.state.taxactionSystem !== "" 
		&& this.state.region!== ""
		&& this.state.validEmployers
		&& this.state.validMonth
		&& this.state.document !== null
		&& this.state.lastMonthDocument !== null)
	}
	
    restoreRequest = () => {
		if(this.validParams())
		{
			var xhr = new XMLHttpRequest();
			xhr.open("post", this.props.urlApiRestore, true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.send(JSON.stringify({
				"Region": this.state.region.slice(0,2),
				"TaxactionSystem": this.state.taxactionSystem,
				"Document": this.state.documents
			}));
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {                   
						var price = JSON.parse(xhr.responseText);
						this.setState({
							restorePrice: price,
							visible: true
						});
					}
					if (xhr.status === 409)
					{
						alert ("Пустые параметры запроса.");
					}
					if (xhr.status === 400) {
						alert("Произошла ошибка, повторите попытку.");
					}
				}
			};
		}
    }
	
    currentRequest = () => {
		if(this.validParams())
		{
			var xhr = new XMLHttpRequest();
			xhr.open("post", this.props.urlCurrentPrice, true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.send(JSON.stringify({
				"Region": this.state.region.slice(0,2),
				"TaxactionSystem": this.state.taxactionSystem,
				"Document": this.state.lastMonthDocument
			}));
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {                   
						var price = JSON.parse(xhr.responseText);
						this.setState({
							currentPrice: price,
							visible: true
						});
					}
					if (xhr.status === 409)
					{
						alert ("Пустые параметры запроса.");
					}
					if (xhr.status === 400) {
						alert("Произошла ошибка, повторите попытку.");
					}
				}
			};
		}
    }	
	
	calculateInitRestoreDocs = (nextProps) => {         
        return ( nextProps.restoreDocuments.buyCount + nextProps.restoreDocuments.sellCount) * 2
            + nextProps.restoreDocuments.equaringCount
            + nextProps.restoreDocuments.bankComissionCount * 0.25
            + nextProps.restoreDocuments.taxCount
            + nextProps.restoreDocuments.incomingBankOrder * 2
            + nextProps.restoreDocuments.outgoingBankOrder * 2;
    }
	
	calculateInitLastMonthDocs = (nextProps) => { 	
		return ( nextProps.lastMonthDocuments.buyCount + nextProps.lastMonthDocuments.sellCount) * 2
			+ nextProps.lastMonthDocuments.equaringCount
			+ nextProps.lastMonthDocuments.bankComissionCount * 0.25
			+ nextProps.lastMonthDocuments.taxCount
			+ nextProps.lastMonthDocuments.incomingBankOrder * 2
			+ nextProps.lastMonthDocuments.outgoingBankOrder * 2;
	}

    restoreDocumentCalculate = (value) => {
        
		if (value !== null)
		{
			this.setState({
				documents: value
			});
		}
		
		setTimeout(this.onRestorePriceRequest, 50);
    }
	
	lastMonthDocumentCalculate = (value) => {	
		if (value !== null)
		{
			this.setState({
				lastMonthDocument: value
			});
		}
		
		setTimeout(this.onCurrentPriceRequest, 50);
	}
	
    isValid = () => {
        if (this.state.region !== "")
        {
            if (this.state.taxactionSystem !== "") {
                return false;
            }
            
            return true;
        }
        return true;
    }
	
	navItemSelect = (eventKey, e) => {
        e.preventDefault();
        this.setState({
            activeNav: eventKey
        });
    }
	
	navTopItemSelect = (eventKey, e) => {
        e.preventDefault();
        this.setState({
            activeTopNav: eventKey
        });
    }
	
	onShowRestore = (e) => {
        e.preventDefault();
        this.setState(()=> ({
            restoreVisible: true,
            lastMonthVisible: false,
        }));
	}	
	onShowLastMonth = (e) => {
		e.preventDefault();
		this.setState(()=> ({
			restoreVisible: false,
			lastMonthVisible: true,
		}));
	}
	
	onShowProviders = (e) => {
		e.preventDefault();
		this.setState(()=> ({
			providersVisible: true,
			customersVisible: false
		}));
	}
	
	onShowCustomers = (e) => {
		e.preventDefault();
		this.setState(()=> ({
			providersVisible: false,
			customersVisible: true
		}));
	}
	
	setRequisites = () => {
		let inn = this.props.statementInfo.organization.inn;
		let kpp = this.props.statementInfo.organization.kpp;
		if(kpp === "")
		{
			return inn;
		}
		return inn + "-" + kpp;
	}

    render() { 
        let validation = this.isValid();
		let requisites = this.setRequisites();
        return (
            <div className={"docs" + (this.props.visible ? '_none' : '')}>
                <div className="restore-content" >
                    <div className="info-panel">
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3" style={{fontSize:"24px"}}>Информация по организации</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body> 
                                <div className="restore">   
                                    <form onSubmit={this.onRestoreRequest2}>
                                        <label> Название</label>
                                        <span className="text-calc">{this.props.statementInfo.organization.name}</span> <br />
                                        <label> ИНН-КПП </label>
                                        <span className="text-calc">{requisites}</span> <br />
                                        <label> Регион </label>
                                        <input className="input-calc" name="region" list="regions" placeholder="Введите код региона или название" onChange={this.onRegionChange} value = {this.state.region}/>
                                        <datalist id="regions">
                                            { 
												this.props.regions.map((item, index) => {												
													return (<option value={item}/>);
												}) 
											}
                                        </datalist>
                                        <br />
                                        <label> СНО </label>
                                        <select name="taxactionSystem" onChange={this.onTaxactionSystemChange} value = {this.state.taxactionSystem}>
                                            <option value="osno">ОСНО</option>
                                            <option value="usnd">УСН доходы</option>
                                            <option value="usndr">УСН д-р или УСН+ЕНВД</option>
                                            <option value="envd">ЕНВД</option>
											<option className="option_display" value="">Выберите СНО</option>
                                        </select>
                                        <br />                                   
                                        <div className="kkm">    
                                            <label> Наличие ККМ </label>
                                            <select id="half" name="kkm" onChange={this.onKkmChange} value ={this.state.kkm}>
                                                <option value={1}>Да</option>
                                                <option value={0}>Нет</option>
												<option className="option_display" value="">Выберите из списка</option>
                                            </select>
                                            <span className={"month" + (this.state.monthVisible ? '_none' : '') }>
                                                <label id="half-label">месяцев: </label>
                                                <input className={"input-calc-half"+(this.state.validMonth?"":"-error")} type="number" value={this.state.month} onChange={this.onChangeMonth}/>
                                            </span>
                                           
                                        </div>
                                        <div>
                                            <p id="errorMessage">{this.state.validMonthMessage}</p>
                                        </div>
										<div className ="director">
											<label>Директор сам заводит документы</label>
											<select name="director" onChange={this.onDirectorChange} value={this.state.director} style = {{height:'30px'}}>
												<option value={1}>Да</option>
												<option value={0}>Нет</option>
												<option className="option_display" value="">Выберите из списка</option>
											</select>
											<ButtonToolbar> 
												<OverlayTrigger
												  placement={'right'}
												  overlay={
													<Tooltip id="coeff_helper">
													 <strong>коэффициент 0,75 </strong> (банковские документы идут за операцию, закрывающие - за половину операции)
													</Tooltip>
												  }
												>
												  <Button variant="secondary" style = {{width: "30px", height: "30px", marginLeft: "8px", borderRadius: "40px", padding: "0px 0px"}}>?</Button>
												</OverlayTrigger>
											</ButtonToolbar>
										</div>
                                        <label> Сотрудники </label>
                                        <input className={"input-calc"+(this.state.validEmployers?'':'-error')} type="number" onChange={this.onEmployersChange} value={this.state.employers} placeholder="Введите значение"></input>
                                        <p id="errorMessage">{this.state.validEmployersMessage}</p>
                                    </form>
                                </div>
                            </Panel.Body>                        
                        </Panel>
						<div className="price">
							<Panel className={"summary" + (this.state.visible ? '_none' : '')} style={{ width: '24rem' }}>
								<Panel.Heading>
									<Panel.Title componentClass="h3" style={{ fontSize: "24px" }}>Стоимость восстановления</Panel.Title>
								</Panel.Heading>
								<Panel.Body>
									<span > {parseInt(this.state.restorePrice, 10)} рублей </span>
								</Panel.Body>
							</Panel>
							<Panel className={"summary" + (this.state.visible ? '_none' : '')} style={{ width: '24rem' }}>
								<Panel.Heading>
									<Panel.Title componentClass="h3" style={{ fontSize: "24px" }}>Стоимость обслуживания</Panel.Title>
								</Panel.Heading>
								<Panel.Body>
									<span > {parseInt(this.state.currentPrice, 10)} рублей </span>
								</Panel.Body>
							</Panel>							
						</div>
						<div>
						<Nav bsStyle="tabs" activeKey={this.state.activeTopNav} onSelect = {this.navTopItemSelect}>
							<NavItem eventKey="1" onClick = {this.onShowProviders}> 
							 Поставщики							
							</NavItem>	
							<NavItem eventKey="2" onClick = {this.onShowCustomers}>
							 Покупатели
							</NavItem>
						</Nav>
							<TopFive
								visible = {this.state.providersVisible}
								name = "Топ-5 поставщиков"
								info = {this.props.statementInfo.topProviders}
							/>
							<TopFive
								visible = {this.state.customersVisible}
								name = "Топ-5 покупателей"
								info = {this.props.statementInfo.topCustomers}
							/>
						</div>
                    </div>
				<div>					
						<Nav bsStyle="tabs" activeKey={this.state.activeNav} onSelect = {this.navItemSelect}>
							<NavItem eventKey="1" onClick = {this.onShowRestore}> 
							 За всё время							
							</NavItem>	
							<NavItem eventKey="2" onClick = {this.onShowLastMonth}>
							 Последний месяц
							</NavItem>
						</Nav>
						<Documents
							dates = {this.props.statementInfo.datesInStatement}
							month = {this.state.month}
							documents = {this.props.statementInfo.restoreDocuments}
							employers = {this.state.employers}
							visible={this.state.restoreVisible}
							documentCoeficient={this.state.documentCoeficient}
							kkm = {this.state.kkm}
							director = {this.state.director}
							updateDocuments = {this.restoreDocumentCalculate}
						/>	
						<Documents
							dates = {this.props.statementInfo.datesInStatement}
							month = {1}
							employers = {this.state.employers}
							documents = {this.props.statementInfo.lastMonthDocuments}
							visible={this.state.lastMonthVisible}
							documentCoeficient={this.state.documentCoeficient}							
							kkm = {this.state.kkm}
							director = {this.state.director}
							updateDocuments = {this.lastMonthDocumentCalculate}
						/>
					</div>						
                </div>
            </div>
        );
    }
}

class Documents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			documents :[],
			closedDocuments: [],
			coefficients: {
				buy: 1,
				sell: 1,
				equaring:1,
				bankComission: 0.25,
				tax: 1,
				incomingBankOrder: 1,
				outgoingBankOrder:1,
				corpCardPay: 1,
				employers: 3
			},
			accountingDocuments : {
				buy: 0,
				sell: 0,
				equaring:0,
				bankComission: 0,
				tax: 0,
				incomingBankOrder: 0,
				outgoingBankOrder: 0,
				corpCardPay: 0,
				cashbox : 0,
				employers : 0			
			},
			summaryBankDocuments: 0,
			summaryClosedDocuments: 0,
			summaryAllDocuments: 0,
			kkm : 0,
			month : 0,
			cashbox: 0,
			cashboxCloseDoc:0,
			employers: 0,
			employersCloseDoc: 0,
			employersMonth: 0,
			director: 0
			
			
        };
    }
	
	componentDidUpdate() {
		if (this.props.documents !== this.state.documents){
			this.setState({
				documents : this.props.documents,
				closedDocuments: {
					buyCount : this.props.documents.buyCount,
					sellCount: this.props.documents.sellCount,
					equaringCount: 0,
					bankComissionCount: 0,
					taxCount: 0,
					incomingBankOrder: this.props.documents.incomingBankOrder,
					outgoingBankOrder: this.props.documents.outgoingBankOrder,
					corpCardPay : this.props.documents.corpCardPay
				},
				month: this.props.month,
				kkm: this.props.kkm,
				cashbox: this.props.kkm * 30 * this.props.month,
				cashboxCloseDoc : this.props.month * this.props.kkm,
				employers: this.props.employers,
				employersCloseDoc: this.state.coefficients.employers * this.props.employers,
				employersMonth: this.props.month
			});
			
			setTimeout (() => {this.calculateAccountingDocuments()}, 50);
		}
	}
	
	componentWillReceiveProps (nextProps){
		if (this.state.kkm !== nextProps.kkm) 
		{
			this.setState ({
				kkm: nextProps.kkm,
				cashbox: nextProps.kkm * 30 * this.props.month,
				cashboxCloseDoc : this.props.month * nextProps.kkm
			});
			
			setTimeout(() => {this.calculateAccountingDocuments()}, 50);
		}
		
		if (this.state.month !== nextProps.month)
		{
			this.setState ({
				month: nextProps.month,
				cashbox: this.props.kkm * 30 * nextProps.month,
				cashboxCloseDoc : nextProps.month * this.props.kkm
			});
			
			setTimeout (() => {this.calculateAccountingDocuments()}, 50);
		}
		
		if ( this.state.employers !== nextProps.employers)
		{
			this.setState({				
				employers: nextProps.employers,
				employersCloseDoc: this.state.coefficients.employers * nextProps.employers,
				employersMonth: nextProps.month
			});
			
			setTimeout (() => {this.calculateAccountingDocuments()}, 50);
		}
		
		if ( this.state.director !== nextProps.director)
		{				
			this.setState ({
					director: nextProps.director
			});
			
			setTimeout(() => {this.changeCoefficient()}, 50);	
			setTimeout(() => {this.calculateAccountingDocuments()}, 100);	
				
		}		
	}
	
	changeCoefficient = () => {
	
		let diff = (0.25 * this.state.director)
		this.setState ({
			coefficients: {
				buy: 1 - diff,
				sell: 1 - diff,
				equaring:1,
				bankComission: 0.25,
				tax: 1,
				incomingBankOrder: 1 - diff,
				outgoingBankOrder:1 - diff,
				corpCardPay: 1- diff,
				employers: 3
			}
		});
	}

    onEquaringChange = (e) => {
        let value = parseInt(e.target.value, 10);
        this.setState({
            closedDocuments: {
                buyCount: this.state.closedDocuments.buyCount,
				sellCount: this.state.closedDocuments.sellCount,
				equaringCount:value,
				bankComissionCount: this.state.closedDocuments.bankComissionCount,
				taxCount: this.state.closedDocuments.taxCount,
				incomingBankOrder: this.state.closedDocuments.incomingBankOrder,
				outgoingBankOrder:this.state.closedDocuments.outgoingBankOrder,
				corpCardPay : this.state.documents.corpCardPay
            }
        });
		
			setTimeout(() => {this.calculateAccountingDocuments()}, 100);
    }
    onBankComissionChange = (e) => {
        let value = parseInt(e.target.value, 10);
        this.setState({
            closedDocuments: {
                buyCount: this.state.closedDocuments.buyCount,
				sellCount: this.state.closedDocuments.sellCount,
				equaringCount:this.state.closedDocuments.equaringCount,
				bankComissionCount: value,
				taxCount: this.state.closedDocuments.taxCount,
				incomingBankOrder: this.state.closedDocuments.incomingBankOrder,
				outgoingBankOrder:this.state.closedDocuments.outgoingBankOrder,
				corpCardPay : this.state.documents.corpCardPay
            }
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
    }

    onBuyChange = (e) => {
		let value = parseInt(e.target.value, 10);
        this.setState({
            closedDocuments: {
                buyCount: value,
				sellCount: this.state.closedDocuments.sellCount,
				equaringCount:this.state.closedDocuments.equaringCount,
				bankComissionCount: this.state.closedDocuments.bankComissionCount,
				taxCount: this.state.closedDocuments.taxCount,
				incomingBankOrder: this.state.closedDocuments.incomingBankOrder,
				outgoingBankOrder:this.state.closedDocuments.outgoingBankOrder,
				corpCardPay : this.state.documents.corpCardPay
            }
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
    }
    onSellChange = (e) => {
        let value = parseInt(e.target.value, 10);
        this.setState({
            closedDocuments: {
                buyCount: this.state.closedDocuments.buyCount,
				sellCount: value,
				equaringCount:this.state.closedDocuments.equaringCount,
				bankComissionCount: this.state.closedDocuments.bankComissionCount,
				taxCount: this.state.closedDocuments.taxCount,
				incomingBankOrder: this.state.closedDocuments.incomingBankOrder,
				outgoingBankOrder:this.state.closedDocuments.outgoingBankOrder,
				corpCardPay : this.state.documents.corpCardPay
            }
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);		
    }
	
	onTaxChange = (e) => {
		let value = parseInt(e.target.value, 10);
        this.setState({
            closedDocuments: {
                buyCount: this.state.closedDocuments.buyCount,
				sellCount: this.state.closedDocuments.sellCount,
				equaringCount:this.state.closedDocuments.equaringCount,
				bankComissionCount: this.state.closedDocuments.bankComissionCount,
				taxCount: value,
				incomingBankOrder: this.state.closedDocuments.incomingBankOrder,
				outgoingBankOrder:this.state.closedDocuments.outgoingBankOrder,
				corpCardPay : this.state.documents.corpCardPay
            }
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	onIncomingBankOrderChange = (e) => {
		let value = parseInt(e.target.value, 10);
        this.setState({
            closedDocuments: {
                buyCount: this.state.closedDocuments.buyCount,
				sellCount: this.state.closedDocuments.sellCount,
				equaringCount:this.state.closedDocuments.equaringCount,
				bankComissionCount: this.state.closedDocuments.bankComissionCount,
				taxCount: this.state.closedDocuments.taxCount,
				incomingBankOrder: value,
				outgoingBankOrder:this.state.closedDocuments.outgoingBankOrder,
				corpCardPay : this.state.documents.corpCardPay
            }
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	onOutgoingBankOrderChange = (e) => {
		let value = parseInt(e.target.value, 10);
        this.setState({
            closedDocuments: {
                buyCount: this.state.closedDocuments.buyCount,
				sellCount: this.state.closedDocuments.sellCount,
				equaringCount:this.state.closedDocuments.equaringCount,
				bankComissionCount: this.state.closedDocuments.bankComissionCount,
				taxCount: this.state.closedDocuments.taxCount,
				incomingBankOrder: this.state.closedDocuments.incomingBankOrder,
				outgoingBankOrder: value,
				corpCardPay : this.state.documents.corpCardPay
            }
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	onCorpCardPayChange = (e) => {
		let value = parseInt(e.target.value, 10);
        this.setState({
            closedDocuments: {
                buyCount: this.state.closedDocuments.buyCount,
				sellCount: this.state.closedDocuments.sellCount,
				equaringCount:this.state.closedDocuments.equaringCount,
				bankComissionCount: this.state.closedDocuments.bankComissionCount,
				taxCount: this.state.closedDocuments.taxCount,
				incomingBankOrder: this.state.closedDocuments.incomingBankOrder,
				outgoingBankOrder: this.state.closedDocuments.outgoingBankOrder,
				corpCardPay : value
            }
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	
	onCashboxChange = (e) => 
	{
		let value = parseInt(e.target.value, 10);
		this.setState({
			cashbox: value
		});
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	onCashboxCloseDocsChange = (e) => 
	{
		let value = parseInt(e.target.value, 10);
		this.setState({
			cashboxCloseDoc: value
		});
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	onEmployersCloseDocChange = (e) => {
		let value = parseInt(e.target.value , 10);
		this.setState({
			employersCloseDoc : value
		});
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	onEmployersMonthChange = (e) => {
		let value = parseInt(e.target.value , 10);
		this.setState({
			employersMonth : value
		});
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	onBuyCoefficientChange = (e) => {
		let value = e.target.value;
		this.setState({
            coefficients: {
				buy: value,
				sell: this.state.coefficients.sell,
				equaring:this.state.coefficients.equaring,
				bankComission: this.state.coefficients.bankComission,
				tax: this.state.coefficients.tax,
				incomingBankOrder: this.state.coefficients.incomingBankOrder,
				outgoingBankOrder:this.state.coefficients.outgoingBankOrder,
				corpCardPay: this.state.coefficients.corpCardPay,
				employers: this.state.employers
			}
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	onSellCoefficientChange = (e) => {
		let value = e.target.value;
		this.setState({
            coefficients: {
				buy: this.state.coefficients.buy,
				sell: value,
				equaring:this.state.coefficients.equaring,
				bankComission: this.state.coefficients.bankComission,
				tax: this.state.coefficients.tax,
				incomingBankOrder: this.state.coefficients.incomingBankOrder,
				outgoingBankOrder:this.state.coefficients.outgoingBankOrder,
				corpCardPay: this.state.coefficients.corpCardPay,
				employers: this.state.employers
			}
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	onEquaringCoefficientChange = (e) => {
		let value = e.target.value;
		this.setState({
            coefficients: {
				buy: this.state.coefficients.buy,
				sell: this.state.coefficients.sell,
				equaring: value,
				bankComission: this.state.coefficients.bankComission,
				tax: this.state.coefficients.tax,
				incomingBankOrder: this.state.coefficients.incomingBankOrder,
				outgoingBankOrder:this.state.coefficients.outgoingBankOrder,
				corpCardPay: this.state.coefficients.corpCardPay,
				employers: this.state.employers
			}
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	onBankComissionCoefficientChange = (e) => {
		let value = e.target.value;
		this.setState({
            coefficients: {
				buy: this.state.coefficients.buy,
				sell: this.state.coefficients.sell,
				equaring: this.state.coefficients.equaring,
				bankComission: value,
				tax: this.state.coefficients.tax,
				incomingBankOrder: this.state.coefficients.incomingBankOrder,
				outgoingBankOrder:this.state.coefficients.outgoingBankOrder,
				corpCardPay: this.state.coefficients.corpCardPay,
				employers: this.state.employers
			}
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	onTaxCoefficientChange = (e) => {
		let value = e.target.value;
		this.setState({
            coefficients: {
				buy: this.state.coefficients.buy,
				sell: this.state.coefficients.sell,
				equaring:this.state.coefficients.equaring,
				bankComission: this.state.coefficients.bankComission,
				tax: value,
				incomingBankOrder: this.state.coefficients.incomingBankOrder,
				outgoingBankOrder:this.state.coefficients.outgoingBankOrder,
				corpCardPay: this.state.coefficients.corpCardPay,
				employers: this.state.employers
			}
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	onIncomingBankOrderCoefficientChange = (e) => {
		let value = e.target.value;
		this.setState({
            coefficients: {
				buy: this.state.coefficients.buy,
				sell: this.state.coefficients.sell,
				equaring:this.state.coefficients.equaring,
				bankComission: this.state.coefficients.bankComission,
				tax: this.state.coefficients.tax,
				incomingBankOrder: value,
				outgoingBankOrder:this.state.coefficients.outgoingBankOrder,
				corpCardPay: this.state.coefficients.corpCardPay,
				employers: this.state.employers
			}
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	onOutgoingBankOrderCoefficientChange = (e) => {
		let value = e.target.value;
		this.setState({
            coefficients: {
				buy: this.state.coefficients.buy,
				sell: this.state.coefficients.sell,
				equaring:this.state.coefficients.equaring,
				bankComission: this.state.coefficients.bankComission,
				tax: this.state.coefficients.tax,
				incomingBankOrder: this.state.coefficients.incomingBankOrder,
				outgoingBankOrder:value,
				corpCardPay: this.state.coefficients.corpCardPay,
				employers: this.state.employers
			}
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	onCorpCardPayCoefficientChange = (e) => {
		let value = e.target.value;
		this.setState({
            coefficients: {
				buy: this.state.coefficients.buy,
				sell: this.state.coefficients.sell,
				equaring:this.state.coefficients.equaring,
				bankComission: this.state.coefficients.bankComission,
				tax: this.state.coefficients.tax,
				incomingBankOrder: this.state.coefficients.incomingBankOrder,
				outgoingBankOrder:this.state.coefficients.outgoingBankOrder,
				corpCardPay : value,
				employers: this.state.employers
			}
        });
		
		setTimeout(() => {this.calculateAccountingDocuments()}, 100);
	}
	
	calculateAccountingDocuments = () =>
	{		
		this.setState ({ 
			accountingDocuments : {
				buy: (this.state.documents.buyCount + this.state.closedDocuments.buyCount) * this.state.coefficients.buy,
				sell: (this.state.documents.sellCount + this.state.closedDocuments.sellCount) * this.state.coefficients.sell,
				equaring: (this.state.documents.equaringCount + this.state.closedDocuments.equaringCount) * this.state.coefficients.equaring,
				bankComission: (this.state.documents.bankComissionCount + this.state.closedDocuments.bankComissionCount) * this.state.coefficients.bankComission,
				tax: (this.state.documents.taxCount + this.state.closedDocuments.taxCount) * this.state.coefficients.tax,
				incomingBankOrder: (this.state.documents.incomingBankOrder + this.state.closedDocuments.incomingBankOrder) * this.state.coefficients.incomingBankOrder,
				outgoingBankOrder: (this.state.documents.outgoingBankOrder + this.state.closedDocuments.outgoingBankOrder) * this.state.coefficients.outgoingBankOrder,
				corpCardPay: (this.state.documents.corpCardPay + this.state.closedDocuments.corpCardPay) * this.state.coefficients.corpCardPay,
				cashbox: this.state.cashbox + this.state.cashboxCloseDoc,
				employers: this.state.employersCloseDoc * this.state.employersMonth
			}
		});
		
		setTimeout(() => {this.calculateAllDocument()}, 100);
	}
	
    calculateAllDocument = () => {
		let docs = this.state.accountingDocuments;
        let res = docs.buy 
			+ docs.sell 
			+ docs.equaring 
			+ docs.tax 
			+ docs.bankComission 
			+ docs.incomingBankOrder 
			+ docs.outgoingBankOrder 
			+ docs.corpCardPay
			+ docs.cashbox
			+ docs.employers;
			
			setTimeout(
				this.setState({
					summaryAllDocuments: res
				}), 50);
		setTimeout(this.onUpdateDocuments(), 100);
    }
	
	
	
	ConvertToString = (e) => {
		return ""+ e;
	}
	
	onUpdateDocuments = () => {
        if ( this.state.summaryAllDocuments > 0 )
        {		
           setTimeout(this.props.updateDocuments(this.state.summaryAllDocuments), 50);
        }
	}
	
    render() {
        return (
            <div className={"docs" + (this.props.visible ? '_none' : '')}>
                <Panel className="document-panel">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3" style={{ fontSize: "24px" }}>Документы</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <div>
                            <p className="p-docs">Период выписки с {this.ConvertToString(this.props.dates.period.dateFrom).slice(0,10)} по {this.ConvertToString(this.props.dates.period.dateTo).slice(0,10)}</p>
                            <p className="p-docs">Месяцев в выписке: {this.props.dates.period.monthCount}</p>
							<p className="p-docs">Последний полный месяц: {this.props.dates.lastMonth}</p>
                        </div>

                        <Table striped bordered condensed hover style={{ maxWidth: "550px" }}>
                            <thead>
                                <tr>
                                    <th className="row-name">Наименование</th>
                                    <th>Операций в&nbsp;банковской выписке </th>
                                    <th>Закрывающих документов </th>									
									<th>Коэффициент</th>
                                    <th>Бухгалтерских операций в&nbsp;расчете</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="row-name">Покупки</td>
                                    <td> (&nbsp;&nbsp;{this.state.documents.buyCount}&nbsp;&nbsp;&nbsp;+</td>
                                    <td><input className="input-table" type="number" value={this.state.closedDocuments.buyCount} onChange={this.onBuyChange}></input>&nbsp;&nbsp;)&nbsp;&nbsp;*</td>
									<td className="td-equival"><input className="input-table" type="number" min="0" max="100" step="0.01" value={this.state.coefficients.buy} onChange= {this.onBuyCoefficientChange}/>&nbsp;&nbsp;= </td>
                                    <td>{this.state.accountingDocuments.buy}</td>
                                </tr>
                                <tr>
                                    <td className="row-name">Продажи</td>
                                    <td>(&nbsp;&nbsp;{this.state.documents.sellCount}&nbsp;&nbsp;&nbsp;+</td>
                                    <td><input className="input-table" type="number" value={this.state.closedDocuments.sellCount} onChange={this.onSellChange}></input>&nbsp;&nbsp;)&nbsp;&nbsp;*</td>
									<td><input className="input-table" type="number" min="0" max="100" step="0.01" value={this.state.coefficients.sell} onChange={this.onSellCoefficientChange}/>&nbsp;&nbsp;=</td>
                                    <td>{this.state.accountingDocuments.sell}</td>
                                </tr>
                                <tr>
                                    <td className="row-name">Эквайринг</td>
                                    <td>(&nbsp;&nbsp;{this.state.documents.equaringCount}&nbsp;&nbsp;&nbsp;+</td>
                                    <td><input className="input-table" type="number" value={this.state.closedDocuments.equaringCount} onChange={this.onEquaringChange}/>&nbsp;&nbsp;)&nbsp;&nbsp;*</td>
									<td><input className="input-table" type="number" min="0" max="100" step="0.01" value={this.state.coefficients.equaring} onChange={this.onEquaringCoefficientChange}/>&nbsp;&nbsp;=</td>
                                    <td>{this.state.accountingDocuments.equaring}</td>
                                </tr>
                                <tr>
                                    <td className="row-name">Комиссия банка</td>
                                    <td>(&nbsp;&nbsp;{this.state.documents.bankComissionCount}&nbsp;&nbsp;&nbsp;+</td>
                                    <td><input className="input-table" type="number" value={this.state.closedDocuments.bankComissionCount} onChange={this.onBankComissionChange}/>&nbsp;&nbsp;)&nbsp;&nbsp;*</td>
									<td><input className="input-table" type="number" min="0" max="100" step="0.01" value={this.state.coefficients.bankComission} onChange={this.onBankComissionCoefficientChange}/>&nbsp;&nbsp;=</td>
                                    <td>{this.state.accountingDocuments.bankComission}</td>
                                </tr>
                                <tr>
                                    <td className="row-name"><p>Налоговые платежи</p></td>
                                    <td>(&nbsp;&nbsp;{this.state.documents.taxCount}&nbsp;&nbsp;&nbsp;+</td>
									<td><input className="input-table" type="number" value={this.state.closedDocuments.taxCount} onChange={this.onTaxChange}/>&nbsp;&nbsp;)&nbsp;&nbsp;*</td>
                                    <td><input className="input-table" type="number" min="0" max="100" step="0.01" value={this.state.coefficients.tax} onChange={this.onTaxCoefficientChange}/>&nbsp;&nbsp;=</td>
                                    <td>{this.state.accountingDocuments.tax}</td>
                                </tr>
                                <tr>
                                    <td className="row-name"><p>Входящий <br/>банк.ордер</p></td>
                                    <td>(&nbsp;&nbsp;{this.state.documents.incomingBankOrder}&nbsp;&nbsp;&nbsp;+</td>
									<td><input className="input-table" type="number" value={this.state.closedDocuments.incomingBankOrder} onChange={this.onIncomingBankOrderChange}/>&nbsp;&nbsp;)&nbsp;&nbsp;*</td>
                                    <td><input className="input-table" type="number" min="0" max="100" step="0.01" value={this.state.coefficients.incomingBankOrder} onChange={this.onIncomingBankOrderCoefficientChange}/>&nbsp;&nbsp;=</td>
                                    <td>{this.state.accountingDocuments.incomingBankOrder}</td>
                                </tr>
                                <tr>
                                    <td className="row-name"><p>Исходящий <br />банк.ордер</p></td>
                                    <td>(&nbsp;&nbsp;{this.state.documents.outgoingBankOrder}&nbsp;&nbsp;&nbsp;+</td>
									<td><input className="input-table" type="number" value={this.state.closedDocuments.outgoingBankOrder} onChange={this.onOutgoingBankOrderChange}/>&nbsp;&nbsp;)&nbsp;&nbsp;*</td>
                                    <td><input className="input-table" type="number" min="0" max="100" step="0.01" value={this.state.coefficients.outgoingBankOrder} onChange={this.onOutgoingBankOrderCoefficientChange}/>&nbsp;&nbsp;=</td>
                                    <td>{this.state.accountingDocuments.outgoingBankOrder}</td>
                                </tr>
								<tr>
                                    <td className="row-name"><p>Оплата <br />по корп.карте</p></td>
                                    <td>(&nbsp;&nbsp;{this.state.documents.corpCardPay}&nbsp;&nbsp;&nbsp;+</td>
									<td><input className="input-table" type="number" value={this.state.closedDocuments.corpCardPay} onChange={this.onCorpCardPayChange}/>&nbsp;&nbsp;)&nbsp;&nbsp;*</td>
                                    <td><input className="input-table" type="number" min="0" max="100" step="0.01" value={this.state.coefficients.corpCardPay} onChange={this.onCorpCardPayCoefficientChange}/>&nbsp;&nbsp;=</td>
                                    <td>{this.state.accountingDocuments.corpCardPay}</td>
                                </tr>
								<tr>
                                    <td colSpan="5"></td>
                                </tr>
                                <tr>
                                    <td className="row-name"><p>Касса</p></td>
									<td><input className="input-table" type="number" value={this.state.cashbox} onChange={this.onCashboxChange}/>&nbsp;&nbsp;+</td>
									<td><input className="input-table" type="number" value={this.state.cashboxCloseDoc} onChange={this.onCashboxCloseDocsChange}/>&nbsp;&nbsp;=</td>							
									<td></td>
                                    <td>{this.state.accountingDocuments.cashbox}</td>
                                </tr>
                                <tr>
                                    <td colSpan="5"></td>
                                </tr>
								<tr>
                                    <td className="row-name"><p>Сотрудники</p></td>
									<td>{this.state.employers} сотр.</td>	
									<td><input className="input-table" type="number" value={this.state.employersCloseDoc} onChange={this.onEmployersCloseDocChange}/>&nbsp;&nbsp;*</td>									
									<td><input className="input-table" type="number" value={this.state.employersMonth} onChange={this.onEmployersMonthChange}/>&nbsp;&nbsp;=</td>
									
                                    <td>{this.state.accountingDocuments.employers}</td>
                                </tr>
								<tr>
                                    <td colSpan="5"></td>
                                </tr>
                                <tr>
                                    <td className="row-name">Итого</td>
                                    <td colSpan = "3"></td>
                                    <td>{this.state.summaryAllDocuments}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

class TopFive extends React.Component {
	constructor(props) {
        super(props);
        this.state = {            
        };		
    }
	
	render() {
        return (
		<div className={"docs" + (this.props.visible ? '_none' : '')}>
			<Panel className="document-panel">
				<Panel.Heading>
					<Panel.Title componentClass="h3" style={{ fontSize: "24px" }}>{this.props.name}</Panel.Title>
				</Panel.Heading>
				<Panel.Body>
					<Table striped bordered condensed hover style={{ maxWidth: "550px" }}>
						<thead>
							<tr>
								<th className="row-name">Наименование</th>
								<th>ИНН</th>
								<th>Сумма</th>
							</tr>
						</thead>
						<tbody>
							{
								this.props.info.list.map((item,index) => {
								while (index<5)
								{
									return (
									<tr>							
										<td style = {{textAlign: "left"}}>{item.name.slice(0,50)}</td>
										<td>{item.inn}</td>
										<td>{item.value} руб.</td>
									</tr>
									)
								}
								})
							}
						</tbody>
					</Table>
				</Panel.Body>
			</Panel>
		</div>
		);
	}
}

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            email: "",
            message: "",
            valid: false,
            error:""
        };
    }
    updateData = (email, message, valid) => {
        this.setState({
            email: email,
            message: message,
            valid: valid,
            error:""
        });
    }
    handleShow = () => {
        this.setState({
            show:true
        });
    }
    handleClose = () => {
        this.setState({
            show: false,
            email: "",
            message: "",
            error:""
        });
    }
    // Отправка письма
    onSendMail = () => {
        if (this.state.email.length > 0) {
            if (this.state.message.length > 0) {
                var data = JSON.stringify({ "address": this.state.email, "message": this.state.message });
                var xhr = new XMLHttpRequest();
                console.log(data);
                xhr.open("post", this.props.apiUrl, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.send(data);
                this.setState({
                    error: ""
                });
                setTimeout(this.handleClose(),1000);
            } else {
                this.setState({
                    error: "Отправка не удалась, проверьте заполненные поля"
                });
            }
        } else {
            this.setState({
                error: "Отправка не удалась, проверьте заполненные поля"
            });
        }
    }
    render() {
        return (
            <div>
                <a className="modal-link" link="#" onClick={this.handleShow}>Написать нам</a>            
                <div>
                    <Modal className = "modal" show={this.state.show} onHide={this.handleClose}>
                        <ModalHeader closeButton>
                            <ModalTitle>Оставить сообщение</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <MailForm updateData={this.updateData} />
                            <p style={{color:"grey"}}> * отмечены обязательные поля</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button bsStyle="primary" onClick={this.onSendMail}>Отправить</Button>
                            <Button onClick={this.handleClose}>Закрыть</Button>
                            <p>{this.state.error}</p>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
            );
    }
} 

class MailForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: "",
            subject: "",
            message: "",
            addressValid: false,
            messageValid: false,
            formValid: false,
            addressErrorMsg: "",
            messageErrorMsg: "",
            sendMail: ""
        };
    }
    validateAddress(addr) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(addr);
    }
    getValidateAddress() {
        var isValid = this.state.addressValid;
        var addr = this.state.address;
        if (addr === "") return null;
        else if (isValid === true) {
            return 'success';
        }
        else if (isValid === false) {
            return 'error';
        }
    }
   
    validateMessage() {
        let length = this.state.message.length;
        if (length < 2000) {
            this.setState({
                subjectValid: true
            });
        } else return false;
    }

    getValidateMessage() {
        let length = this.state.message.length;
        if (length > 2000) return 'error';
        else if (length > 1500) return 'warning';
        else if (length > 0) return 'success';
        return null;
    }


    onEmailChange = (e) => {
        var addr = e.target.value;
        var length = addr.length;
        var addressIsValid = this.validateAddress(addr);
        if (length === 0) {
            this.setState({
                addressErrorMsg: "E-mail не может быть пустым",
                address: addr
            });
        } else if (addressIsValid === false) {
            this.setState({
                addressErrorMsg: "Некорректный e-mail",
                address: addr
            });
        } else {
            this.setState({
                addressErrorMsg: "",
                address: addr
            });            
        }
        this.setState({
            address: addr,
            addressValid: addressIsValid,
            sendMail: ""
        }, () => {
            this.collectParams();
        });
        
    }
    collectParams = (e) => {
        if (this.state.addressValid) {
            setTimeout(this.props.updateData(this.state.address, this.state.message, true), 50);
        }
        setTimeout(this.props.updateData(this.state.address, this.state.message, false), 50);
    }
    
    onMessageChange = (e) => {
        var msg = e.target.value;
        var msgIsValid = this.validateMessage();
        var length = msg.length;
        if (length === 0) {
            this.setState({
                messageErrorMsg: "Сообщение не может быть пустым"
            });
        } else if (msgIsValid === false) {
            this.setState({
                messageErrorMsg: "Сообщение не может превышать 2000 символов"
            });
        } else {
            this.setState({
                messageErrorMsg: ""
            });
        }
        this.setState({
            message: msg,
            messageValid: msgIsValid,
            sendMail: ""
        }, () => {
            this.collectParams();
            });
    }

    render() {
        var errAddr = this.state.addressErrorMsg ? "" : "none";
        var errMsg = this.state.messageErrorMsg ? "" : "none";
        var errSend = this.state.sendMail ? "" : "none";
        return (
            <div>
                <form onSubmit={this.collectParams}>
                    <FormGroup
                        validationState={this.getValidateAddress()}
                    >
                        <ControlLabel>Ваш е-mail*:</ControlLabel>
                        <FormControl
                            type="email"
                            htmlFor="email"
                            placeholder="Ваш эл. адрес"
                            value={this.state.address}
                            onChange={this.onEmailChange}

                        />
                        <FormControl.Feedback />
                        <p style={{ display: errAddr, color: "red" }}>{this.state.addressErrorMsg}</p>
                    </FormGroup>

                    <FormGroup
                        validationState={this.getValidateMessage()}
                    >
                        <p />
                        <ControlLabel>Сообщение*:</ControlLabel>

                        <FormControl
                            componentClass="textarea"
                            rows="6"
                            placeholder="Введите ваше сообщение"
                            value={this.state.message}
                            onChange={this.onMessageChange}
                        />
                        <FormControl.Feedback />
                        <p style={{ display: errMsg, color: "red" }}>{this.state.messageErrorMsg}</p>
                        
                        <p style={{ display: errSend, color: "red" }}>{this.state.sendMail}</p>
                    </FormGroup>
                </form>
            </div>
        );
    }
}

class CalculatorPage extends React.Component{
    render() {
        return (
            <div className="index-page">
                <ContentCalc apiUrlUpload="calc/api/files" />
            </div>
        );
    }
}

ReactDOM.render(
    <CalculatorPage />,
    document.getElementById('react-contact-me')
);