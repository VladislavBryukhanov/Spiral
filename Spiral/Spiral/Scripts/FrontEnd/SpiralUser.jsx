class SpiralUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.user };
        this.onClickDel = this.onClickDel.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
    }
    onClickDel(e) {
        this.props.onRemove(this.state.data);
    }
    onClickEdit(e) {
        this.props.onEdit(this.state.data);
    }
    render() {
        if (this.props.page == "second") {
            return (
                                        <div>
                                                <div className="dataList">
                                                    <p>Username: {this.state.data.FirstName} {this.state.data.LastName}</p>
                                                    <p>Position: {this.state.data.RoleOfUser}</p>
                                                    <p>Enrolled in: </p>
                                        </div>
           <div className="dataList">
                <p>Settings</p>
                <p>Allow change of user departments</p>
            </div>
    </div>
                                );
        }
        if (Logined.Role == 3 || this.state.data.ID == Logined.ID) { //админская страница, позволяющая редактировать и удалять профили или страница владельца профиля
            return <div className="dataList">
                                                   <img className="img-circle Avatar" height="50" src={this.state.data.PhotoPath } />
                                                    <button className="btn btn-Primary" onClick={this.onClickEdit }>Edit</button>
                                                    <button className="btn btn-danger" onClick={this.onClickDel }>Delete</button>
                                                   <img className="Decoration" height="50" src="../Scripts/FrontEnd/Layout/icons.svg" />
                                                    <p><a>{this.state.data.FirstName} {this.state.data.LastName}</a></p>
                                                    <p>Email: {this.state.data.Email}</p>
                                                    <p>Role: {this.state.data.RoleOfUser}</p>
            </div>;
        }
        else if (Logined.Role == 2) {                       // страница менеджера
            return <div  className="dataList">

                                                   <img className="img-circle Avatar" height="50" src={this.state.data.PhotoPath } />
                                                    <p><a>{this.state.data.FirstName} {this.state.data.LastName}</a></p>
                                                    <p>Email: {this.state.data.Email}</p>
                                                    <p>Role: {this.state.data.RoleOfUser}</p>

            </div>;
        }
        else return null;


    }
}

  //    <div class="modal fade">
  //<div className="modal-dialog">
  //                                          <Auentification LoginUrl="/home/Auentification" />
      
  //</div>
  //    </div>