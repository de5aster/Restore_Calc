var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var FormControl = ReactBootstrap.FormControl;
var Button = ReactBootstrap.Button;
var Tooltip = ReactBootstrap.Tooltip;
var Overlay = ReactBootstrap.Overlay;

var MenuWave = React.createClass({
    render: function () {
        return (
            <div className="menu">
                <nav role="navigation" className="main-menu">
                    <input type="checkbox" name="gamb-menu" id="btn-menu" />
                    <label htmlFor="btn-menu">Меню</label>
                    <ul className="menu-list">
                        <li className="menu-li"><a href="/Home/Index" className="menu-link">Главная</a></li>
                        <li className="menu-li"><a href="/Home/Myreport" className="menu-link">Доклад</a></li>
                        <li className="menu-li"><a href="/Home/Life" className="menu-link">Игра "Жизнь"</a></li>
                        <li className="menu-li"><a href="/Home/Hh" className="menu-link">HeadHunter</a></li>
                        <li className="menu-li"><a href="/Home/Contact" className="menu-link">Обратная связь</a></li>
                        <li className="menu-li"><a href="/Home/Calc" className="menu-link">Калькулятор</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
});
var Footer = React.createClass({
    render: function () {
        return (
            <div className="footer-main">
                <footer>
                    <p> &#169; Copyright Kalistratov Anton</p>
                    
                </footer>
            </div>
        );
    }
});

class ObList extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            inn: '',
            message: "",
            isValid: false,
            visible: false,
            errorMessage: ""
        };
    }
    validateInn = (num) => {
        var re = /^\d+$/;
        return re.test(num);
    }
    setValidateInn = () => {
        let isValid = this.state.isValid;
        var inn = this.state.inn;       
        if (inn == "") return null;
        else if (isValid == true) { return 'success'}
        else if (isValid == false) {return 'error'}
        
    }
    onChangeInn = (e) => {
        let inn = e.target.value;
        let length = inn.length;
        let innIsValid = this.validateInn(inn);
        this.setState({
            message:''
        });
        if (length == 0) {
            this.setState({
                isValid: false,
                errorMessage: "Поле не может быть пустым"
            });
        }
        else if (innIsValid == false) {
            this.setState({
                isValid: false,
                errorMessage: "Некорректный ИНН. Возможно, вы ввели буквы или добавили КПП."
            });
        } else if (length > 12) {
            this.setState({
                isValid: false,
                errorMessage: "Некорректный ИНН. Не может быть больше 12 символов."
            });
        } else if (length < 10) {
            this.setState({
                isValid: false,                
                errorMessage: "Некорректный ИНН. Не может быть меньше 10 символов."
            });
        } 
            else {
            this.setState({
                isValid: true,
                show: false,
                errorMessage: ""
            });
        }
        this.setState({
            inn: e.target.value
        });
    }

    onRequest = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("post", this.props.apiUrl, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify({"inn": this.state.inn}));
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    this.setState({
                        message: "ОБ с данным ИНН присутствует в списке ОБ, которым разрешен ввод кода активации для продления. \nНужно проверить чтобы получатель, куда хотят активировать счет, никогда не был оплачен данной ОБ (Плательщиком)."
                    });
                }
                else if (xhr.status == 400)
                {
                    this.setState({
                        message: "ОБ с данным ИНН нам не известна. Нужно действовать по знанию, отказать в активации."
                    });
                }
            }
        };
    }
    onSubmit = (e) => {
        e.preventDefault();
        let inn = this.state.inn;
        if (inn  != '') {
            this.setState({
                message: "Проверка"
            });
            this.onRequest();
        } else {
            this.setState({
                isValid: false,
                errorMessage: "Поле не может быть пустым"
            });
        }
    }    

    render() {
        var errorInn = this.state.errorMessage ? "" : "none";        
        return (
            <div className="content" style={{marginTop: "50px"}}>
                <form onSubmit={this.onSubmit} style={{padding: "5px 5px"}}>
                    <FormGroup
                        validationState={this.setValidateInn()}
                        style={{ maxWidth: "200px" }}
                    >
                        <ControlLabel>Введите ИНН для поиска: </ControlLabel>      
                        <FormControl
                            type="text"
                            placeholder="ИНН"
                            autoFocus={true}
                            value={this.state.inn}
                            onChange={this.onChangeInn} 
                        /> 
                        <Tooltip placement="bottom" className="in" id="tooltip-bottom" style={{ display: errorInn }}>{this.state.errorMessage}</Tooltip>
                    </FormGroup>                     
                    
                    <Button type="submit" disabled={this.state.errorMessage}> Проверить </Button> <br />
                    <label>{this.state.message}</label>
                </form>
            </div>
            );
    }
}

var ObListPage = React.createClass({
    render: function () {
        return (
            <div className="index-page">
                
                <ObList apiUrl= "/home/oblist/api/ob/post"/>
               
            </div>
        );
    }
});

ReactDOM.render(
    <ObListPage />,
    document.getElementById('react')
);