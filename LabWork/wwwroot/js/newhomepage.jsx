class Content extends React.Component {

    render() {
        return (
            <div className="content" style={{ marginTop: "50px" }}>
                <nav>
                    <ul>
                        <li className="menu-li"><a href="/Home/ObList" className="menu-link">Список ОБ</a></li>
                        <li className="menu-li"><a href="/Home/ObListAdmin" className="menu-link">Админка</a></li>
                        <li className="menu-li"><a href="/Home/Calc" className="menu-link">Кальк</a></li>
                        <li className="menu-li"><a href="/Home/Crash" className="menu-link">Crush them all</a></li>
                    </ul>
                </nav>
            </div>
            );
    }
}
var Footer = React.createClass({
    render: function () {
        return (
            <div className="footer-main">
                <footer>
                    <p>&#169; Copyright Kalistratov Anton</p>                
                    
                </footer>
            </div>
        );
    }
});

var HomePage = React.createClass({
    render: function () {
        return (
            <div className="index-page">               
                <Content />
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <HomePage />,
    document.getElementById('react-content')
);