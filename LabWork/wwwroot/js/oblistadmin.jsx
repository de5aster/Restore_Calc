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
                    <p><a href="ObList">Поиск ОБ</a></p>
                </footer>
            </div>
        );
    }
});

class ObListAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            show: 'none',
            message:''
        };
    }  
    
    onRequestLogin = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("post", this.props.apiUrlLogin, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify({
            "Username": this.state.username,
            "Password": this.state.password
        }));
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    this.setState({
                        message: "Успешно",
                        show:''
                    });
                }
                else if (xhr.status == 400) {
                    this.setState({
                        show: 'none',
                        message: "Некорректный логин или пароль"
                    });
                }
            }
        };
    }
    onSubmitUser = (e) => {
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        if (username != '' && password !='') {
            this.setState({
                message: "Проверка"
            });
            this.onRequestLogin();
        } else {
            this.setState({
                isValid: false,
                errorMessage: "Поля не могут быть пустыми"
            });
        }
    }
    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    render() {          
        return (
            <div className="content" style={{ marginTop: "50px" }}>
                <form onSubmit={this.onSubmitUser} style={{ padding: "5px 5px" }}>
                    <FormGroup
                        style={{ maxWidth: "300px" }}
                    >
                        <ControlLabel>Введите логин: </ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Логин"
                            autoFocus={true}
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        <ControlLabel>Введите пароль: </ControlLabel>
                        <FormControl
                            type="password"
                            placeholder="Пароль"                            
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                        <FormControl.Feedback style={{ marginTop: "6px" }} />                        
                    </FormGroup>

                    <Button type="submit" > Проверить </Button> <br />
                    <label>{this.state.message}</label>
                </form>
                
                <ObListAppend apiUrl="/home/oblist/api/ob/add" show={this.state.show}/>
            </div>
        );
    }
}
class ObListAppend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inn: '',
            message: ''
        };
    }
    onChangeInn = (e) => {
        this.setState ({
            inn: e.target.value
        });
    }

    onSubmitAppend = (e) => {
        e.preventDefault();
        if (this.state.inn != '')
        {
            this.onRequestAppend();
        }
    }
    onRequestAppend = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("post", this.props.apiUrl, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify({ "inn": this.state.inn }));
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    this.setState({
                        message: "ИНН успешно добавлен",
                        show: ''
                    });
                }
                else if (xhr.status == 400) {
                    this.setState({                        
                        message: "ИНН Уже добавлен"
                    });
                }
            }
        };

    }
    render() {       
        return (
            <div>
                <form onSubmit={this.onSubmitAppend} style={{ padding: "5px 5px", display: this.props.show }}>
                    <FormGroup
                        style={{ maxWidth: "300px" }}
                    >
                    <ControlLabel>Введите ИНН: </ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="ИНН"
                        autoFocus={true}
                        value={this.state.inn}
                        onChange={this.onChangeInn}
                    />
                    <Button type="submit" style={{ marginTop: '5px' }}> Добавить </Button> <br />
                    </FormGroup>
                    <label>{this.state.message}</label>
                </form>
            </div>

            );
    }
}

var ObListAdminPage = React.createClass({
    render: function () {
        return (
            <div className="index-page">
                <ObListAdmin apiUrlLogin="/home/admin/api/admin"  />
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <ObListAdminPage />,
    document.getElementById('react')
);