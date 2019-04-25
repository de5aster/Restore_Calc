var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var FormControl = ReactBootstrap.FormControl;
var Button = ReactBootstrap.Button;

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
                    <p>&#169; Copyright Kalistratov Anton</p>
                    <p>Лабораторные работы</p>
                    <p>Студент группы РИЗ - 440018</p>
                </footer>
            </div>
        );
    }
});

class MailForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: "",
            subject: "",
            message: "",
            addressValid: false,
            subjectValid: false,
            messageValid: false,
            formValid: false,
            addressErrorMsg: "",
            subjectErrorMsg: "",
            messageErrorMsg: "",
            sendMail: ""
        };
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onSubjectChange = this.onSubjectChange.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
    }
    validateAddress(addr) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;        
        return re.test(addr);
    }
    getValidateAddress() {        
        var isValid = this.state.addressValid;
        var addr = this.state.address;
        if (addr == "") return null;
        else if (isValid == true) {
            return 'success';
        }
        else if (isValid == false) {
            return 'error';
        } 
    }
    validateSubject() {
        let length = this.state.subject.length;
        if (length < 50) {
            this.setState({
                subjectValid: true
            });           
        }else return false;
    }

    getValidateSubject() {
        let length = this.state.subject.length;
        if (length > 50) {
            return 'error';
        } else if (length>0){
            return 'success';
        }
        return null;
    }
    validateMessage() {
        let length = this.state.message.length;
        if(length < 2000) {
            this.setState({
                subjectValid: true
            });
        }else return false;
    }

    getValidateMessage() {
        let length = this.state.message.length;
        if (length > 2000) return 'error';
        else if (length > 1500) return 'warning';
        else if (length > 0) return 'success';
        return null;
    }
   
    
    onEmailChange(e) {  
        var addr = e.target.value;
        var length = addr.length;
        var addressIsValid = this.validateAddress(addr);   
        if (length == 0) {
            this.setState({
                addressErrorMsg: "E-mail не может быть пустым"
            });
        } else if (addressIsValid == false) {
            this.setState({
                addressErrorMsg: "Некорректный e-mail"
            });
        } else {
            this.setState({
                addressErrorMsg: ""
            });
        }
        this.setState({
            address: addr,
            addressValid: addressIsValid,
            sendMail: ""
        });

    }
    onSubjectChange(e) {
        var sub = e.target.value;        
        var subIsValid = this.validateSubject();         
        if (subIsValid == false) {
            this.setState({
                subjectErrorMsg: "Тема не может быть больше 50 символов"
            });
        } else {
            this.setState({
                subjectErrorMsg: ""
            });
        }
        this.setState({
            subject: sub,
            subjectValid: subIsValid
        });
    }
    onMessageChange(e) {
        var msg = e.target.value;
        var msgIsValid = this.validateMessage();
        var length = msg.length;
        if (length == 0) {
            this.setState({
                messageErrorMsg: "Сообщение не может быть пустым"
            });
        }else if (msgIsValid == false) {
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
        });
    }
    onSubmit(e) {
        e.preventDefault();
        var MailAddress = this.state.address.trim();
        var MailSubject = this.state.subject;
        var MailMessage = this.state.message;
        if (!MailAddress || !MailMessage != "") {
            this.setState({
                sendMail: "Отправка не удалась, проверьте заполненные поля"
            });
        }
        this.props.onEmailSubmit({ address: MailAddress, subject: MailSubject, message: MailMessage });        
        this.setState({ address: "", subject: "", message: "", addressValid: false});
    }

    render() {             
        var errAddr = this.state.addressErrorMsg ? "" : "none";
        var errSub = this.state.subjectErrorMsg ? "" : "none";
        var errMsg = this.state.messageErrorMsg ? "" : "none";
        var errSend = this.state.sendMail ? "" : "none";
        return (            
            <div>
            <form onSubmit={this.onSubmit}>
                    <FormGroup
                        validationState={this.getValidateAddress()}
                    >
                        <ControlLabel>Ваш е-mail</ControlLabel>                        
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
                        validationState={this.getValidateSubject()}
                    >
                        <p />
                    <ControlLabel>Тема письма:</ControlLabel>                
                    <FormControl
                        type="text"
                        placeholder="Тема письма"                            
                        value={this.state.subject}
                        onChange={this.onSubjectChange}
                    />
                    <FormControl.Feedback />
                    <p style={{ display: errSub, color: "red"}}>{this.state.subjectErrorMsg}</p>
                </FormGroup>
                <FormGroup
                        validationState={this.getValidateMessage()}
                    >
                        <p />
                    <ControlLabel>Сообщение:</ControlLabel>  
                
                    <FormControl
                        componentClass="textarea"
                        rows= "10"
                        placeholder="Введите сообщение"
                        value={this.state.message}
                        onChange={this.onMessageChange}
                    />
                    <FormControl.Feedback />
                    <p style={{ display: errMsg, color:"red"}}>{this.state.messageErrorMsg}</p>                
                    <Button type="submit" disabled={this.state.addressErrorMsg||this.state.messageErrorMsg||this.state.subjectErrorMsg}> Отправить </Button>
                    <p style={{ display: errSend, color: "red"}}>{this.state.sendMail}</p>
                </FormGroup>
            </form>
         </div>
        );
    }
}


class MailList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { mails: [] };
        this.onSendMail = this.onSendMail.bind(this);        
    }
        
    // Отправка письма
    onSendMail(mail) {
        if (mail) {
            var data = JSON.stringify({ "address": mail.address, "subject": mail.subject, "message": mail.message });
            var xhr = new XMLHttpRequest();
            console.log(data);
            xhr.open("post", this.props.apiUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");            
            xhr.send(data);
        }
    }

    render() {

        return <div className="content">
            <MailForm onEmailSubmit={this.onSendMail} />            
        </div>;
    }
}

var ContactPage = React.createClass({
    render: function () {
        return (
            <div className="index-page">
                <MenuWave />
                <MailList apiUrl="/home/contact/api/send" />
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <ContactPage />,
    document.getElementById('react-contact-me')
);