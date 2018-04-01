var file;
class SpiralUserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { FirstName: "", LastName: "", Email: "", Passwrd: "", PhotoPath: "", RoleOfUser: 1 };

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
   /*getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    */

    onSubmit(e) {
        e.preventDefault();
        var userFirstName = this.state.FirstName.trim();
        var userLastName = this.state.LastName.trim();
        var userEmail = this.state.Email.trim();
        var userPasswrd = this.state.Passwrd;
        var userRoleOfUser = Math.floor(this.state.RoleOfUser);

        //var userPhotoPath = this.state.PhotoPath;
        //console.log(fileInput.files);
        //var userPhotoPath = this.getBase64(file);
        console.log(file);

        if (!userFirstName || !userLastName || !userEmail || !userPasswrd)
            return;

        this.props.onSpiralUserSubmit({ FirstName: userFirstName, LastName: userLastName, Email: userEmail, PhotoPath: file, RoleOfUser: userRoleOfUser, Passwrd: userPasswrd });
        this.setState({ FirstName: "", LastName: "", Email: "", Passwrd: "", PhotoPath: "", RoleOfUser: 1 });
        ToReg = null;

    }
    render() {
        if (Logined)
            return (
                  <form onSubmit={this.onSubmit} className="Add" enctype="multipart/form-data">

                          <input type="text"
                                  className="form-control  form-control-lg"
                                 placeholder="Email of user"
                                 pattern="^[-._a-zA-Z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$"
                                 value={this.state.Email}
                                 onChange={this.onEmailChange} />
                         <input type="text"
                                 className="form-control form-control-lg"
                                placeholder="Password of user"
                                value={this.state.Passwrd}
                                onChange={this.onPasswrdChange} />
                          <input type="text"
                                 placeholder="First name of user"
                                  className="form-control form-control-lg"
                                 value={this.state.FirstName}
                                 onChange={this.onFirstNameChange} />
                          <input type="text"
                                  className="form-control form-control-lg"
                                 placeholder="Last name of user"
                                 value={this.state.LastName}
                                 onChange={this.onLastNameChange} />

                            <select id="AuentForm" onChange={this.onRoleOfUserChange}  className="form-control form-control-lg">
                                <option value="1">Teacher</option>
                                <option value="2">Manager</option>
                                <option value="3">Admin</option>
                            </select>

                            <input type="file" name="fileInput" id="fileInput"
                                    onChange={this.onPhotoPathChange} />
                           <input type="submit"
                                  className="btn btn-success"
                                  value="Add" />
                  </form>
        )
        else return (
            <div className="col-sm-4 col-xs-4 col-md-4 col-md-offset-4  col-xs-offset-4  col-sm-offset-4">
                 <form onSubmit={this.onSubmit}>

                    <input type="text" className="form-control form-control-lg"
                            placeholder="Email of user"
                            value={this.state.Email}
                            pattern="^[-._a-zA-Z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$"
                            onChange={this.onEmailChange} />
                    <input type="text" className="form-control form-control-lg"
                        placeholder="Password of user"
                        value={this.state.Passwrd}
                        onChange={this.onPasswrdChange} />
                    <input type="text" className="form-control form-control-lg"
                            placeholder="First name of user"
                            value={this.state.FirstName}
                            onChange={this.onFirstNameChange} />
                    <input type="text" className="form-control form-control-lg"
                            placeholder="Last name of user"
                            value={this.state.LastName}
                            onChange={this.onLastNameChange} />
                    <input type="file" name="fileInput" id="fileInput"
                           onChange={this.onPhotoPathChange} />
                    <input type="submit"
                           className="btn btn-success"
                           value="Add" />
                </form>
            </div>
        );
    }
}
