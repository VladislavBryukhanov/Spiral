class Auentification extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Email: "", Passwrd: "" };
        this.onSubmit = this.onSubmit.bind(this);

        this.onLogIn = this.onLogIn.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswrdChange = this.onPasswrdChange.bind(this);
    }

    onEmailChange(e) {
        this.setState({ Email: e.target.value });
    }
    onPasswrdChange(e) {
        this.setState({ Passwrd: e.target.value });
    }



    onSubmit(e) {
        e.preventDefault();
        var userEmail = this.state.Email.trim();
        var userPasswrd = this.state.Passwrd;

        if (!userEmail || !userPasswrd)
            return;

        this.onLogIn(userEmail, userPasswrd);
    }


    onLogIn(email, password) {
        var data1 = new FormData();

        data1.append("Email", email);
        data1.append("Password", password);

        var xhr = new XMLHttpRequest();
        xhr.open("post", this.props.LoginUrl, true);

        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            Logined = { ID: 0, Role: 0 };
            Logined.ID = data.ID;
            Logined.Role = data.RoleOfUser;
            this.render();
        }.bind(this);
        xhr.send(data1);
    }
         
    //разрешить регистрацию
    GoToRegistration() {
        ToReg = 1;
    }
    render() {
        return (

                                      <div>
                                         <div className="row Auentification">
                                              <img src="../Scripts/FrontEnd/Layout/logo_project-name.png" className="col-sm-1 col-xs-1 col-md-1 col-md-offset-7  col-xs-offset-7  col-sm-offset-7" />
                                                  <br />
                                              <form onSubmit={this.onSubmit} className="col-sm-4 col-xs-4 col-md-4 col-md-offset-4  col-xs-offset-4  col-sm-offset-4">

                                                 <img src="../Scripts/FrontEnd/Layout/mini_logo.png" className="col-sm-8 col-xs-8 col-md-8 col-md-offset-2  col-xs-offset-2  col-sm-offset-2" />

                                                  <input type="text"
                                                         placeholder="Email of user"
                                                         value={this.state.Email}
                                                         onChange={this.onEmailChange} />
                                                 <br />
                                                <input type="password"
                                                       placeholder="Password of user"
                                                       value={this.state.Passwrd}
                                                       onChange={this.onPasswrdChange} />
                                                  <br />
                                                 <input type="submit" value="Sign In" />
                                                  <br />
                                                  <a className="col-sm-6 col-xs-6 col-md-6">Forgor password</a>
                                            <a href="#" onClick={() => { this.GoToRegistration() } } className="col-sm-6 col-xs-6 col-md-6">Create account</a>
                                              </form>
                                                  <br />
                                                 <img src="../Scripts/FrontEnd/Layout/logo_fund.png" className="col-sm-4 col-xs-4 col-md-4 col-md-offset-4  col-xs-offset-4  col-sm-offset-4" />

                                         </div>

                                      </div>


                          );

    }
}
