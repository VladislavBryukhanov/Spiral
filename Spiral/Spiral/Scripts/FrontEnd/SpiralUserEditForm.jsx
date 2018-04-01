
class SpiralUserEditForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            FirstName: props.user.FirstName, LastName: props.user.LastName, Email: props.user.Email,
            Passwrd: props.user.Passwrd, PhotoPath: props.user.PhotoPath, RoleOfUser: props.user.RoleOfUser
        };


        this.onSubmit = this.onSubmit.bind(this);

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswrdChange = this.onPasswrdChange.bind(this);
        this.onPhotoPathChange = this.onPhotoPathChange.bind(this);
        this.onRoleOfUserChange = this.onRoleOfUserChange.bind(this);
    }

    onEmailChange(e) {
        this.setState({ Email: e.target.value });
    }
    onPasswrdChange(e) {
        this.setState({ Passwrd: e.target.value });
    }
    onFirstNameChange(e) {
        this.setState({ FirstName: e.target.value });
    }
    onLastNameChange(e) {
        this.setState({ LastName: e.target.value });
    }
    onRoleOfUserChange(e) {
        this.setState({ RoleOfUser: Math.floor(e.target.value) });
    }
    onPhotoPathChange(e) {
        console.log(e.target.files);
        file = e.target.files[0];
        this.setState({ PhotoPath: e.target.files });
    }

    onSubmit(e) {
        e.preventDefault();
        var userFirstName = this.state.FirstName.trim();
        var userLastName = this.state.LastName.trim();
        var userEmail = this.state.Email.trim();
        var userPasswrd = this.state.Passwrd;

        //if(this.state.PhotoPath)
       //     var userPhotoPath = this.state.PhotoPath;
        //else var userPhotoPath = "/Scripts/FrontEnd/images/B.png";

        var userRoleOfUser = Math.floor(this.state.RoleOfUser);

        if (!userFirstName || !userLastName || !userEmail || !userPasswrd)
            return;

        this.props.onSpiralUserUpdateSubmit({ FirstName: userFirstName, LastName: userLastName, Email: userEmail, RoleOfUser: userRoleOfUser, Passwrd: userPasswrd, PhotoPath: file });
        this.setState({ FirstName: "", LastName: "", Email: "", Passwrd: "", PhotoPath: "", RoleOfUser: 1 });

    }
    render() {
        if (Logined.Role == 3 && EditIndex != Logined.ID) { //админская страница, позволяющая редактировать и удалять профили или страница владельца профиля
            return (
                      <form onSubmit={this.onSubmit}>

                          <input type="text"
                                 placeholder="Email of user"
                                 value={this.state.Email}
                                 pattern="^[-._a-zA-Z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$"
                                 onChange={this.onEmailChange} />
                        <input type="password"
                               placeholder="Password of user"
                               value={this.state.Passwrd}
                               onChange={this.onPasswrdChange} />
                          <input type="text"
                                 placeholder="First name of user"
                                 value={this.state.FirstName}
                                 onChange={this.onFirstNameChange} />
                         <input type="text"
                                placeholder="Last name of user"
                                value={this.state.LastName}
                                onChange={this.onLastNameChange} />

                           <select id="AuentForm" onChange={this.onRoleOfUserChange} defaultValue={this.state.RoleOfUser + ""}>
                               <option value="1">Teacher</option>
                               <option value="2">Manager</option>
                               <option value="3">Admin</option>
                           </select>
                        <input type="file"
                                onChange={this.onPhotoPathChange} />
                        <input type="submit" 
                               value="Save" 
                               className="btn btn-success" />
                      </form>
            )
        }
        else return (
                  <form onSubmit={this.onSubmit}>

                          <input type="text"
                                 placeholder="Email of user"
                                 pattern="^[-._a-zA-Z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$"
                                 value={this.state.Email}
                                 onChange={this.onEmailChange} />
                         <input type="password"
                                placeholder="Password of user"
                                value={this.state.Passwrd}
                                onChange={this.onPasswrdChange} />
                          <input type="text"
                                 placeholder="First name of user"
                                 value={this.state.FirstName}
                                 onChange={this.onFirstNameChange} />
                          <input type="text"
                                 placeholder="Last name of user"
                                 value={this.state.LastName}
                                 onChange={this.onLastNameChange} />
                          <input type="file"
                                 onChange={this.onPhotoPathChange} />
                        <input type="submit" 
                               className="btn btn-success" 
                               value="Save" />
                  </form>
                     );
    }
}
