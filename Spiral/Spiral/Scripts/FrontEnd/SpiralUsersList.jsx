
var EditIndex = -1;//индекс строки(профиля) который мы будем изменять, глобальным объявлен для того, чтобы не обнулялся при перерисовке страницы
var Logined = null;//если никто не залогинился, то null => нет доступа к инфе, иначе или записать роль юзера или id
ToReg = null;

var CurrentPage = 1;//текущая станица в окне создания/редактирования профиля
var isEdit = false;//Позволяет узнать находится ли курс в режиме редактирования

class SpiralUsersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            GoToCourses:false
        };

        //this.onLogIn = this.onLogIn.bind(this);
        this.onAddSpiralUser = this.onAddSpiralUser.bind(this);
        this.onEditSpiralUser = this.onEditSpiralUser.bind(this);
        this.GetEditSpiralIndex = this.GetEditSpiralIndex.bind(this);
        this.onRemoveSpiralUser = this.onRemoveSpiralUser.bind(this);
        this.ShowContent=this.ShowContent.bind(this)
    }
    // загрузка данных
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.getUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ users: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    componentDidMount() {
        this.refresher = setInterval(() => this.loadData(), 1000)
    }
    componentWillUnmount() {
        clearInterval(this.refresher)
    }
    // добавление объекта
    onAddSpiralUser(user) {
        if (user) {
            for (var i = 0; i < this.state.users.length; i++) {
                if (this.state.users[i].Email == user.Email) {
                    alert("Email conflict");
                    //console.log("Email conflict");
                    return;
                }
            }
            var data = new FormData();
            data.append("FirstName", user.FirstName);
            data.append("LastName", user.LastName);
            data.append("Email", user.Email);
            data.append("Passwrd", user.Passwrd);
            data.append("RoleOfUser", user.RoleOfUser);
            data.append("img", user.PhotoPath);

            var xhr = new XMLHttpRequest();
            xhr.open("post", this.props.postUrl, true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);

        }
    }
    // удаление объекта
    onRemoveSpiralUser(user) {
        if (user) {
            var data = new FormData();
            data.append("id", user.ID);

            var xhr = new XMLHttpRequest();
            xhr.open("delete", this.props.deleteUrl, true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }

    }

    //получаем индекс объекта, который будем редактировать
    GetEditSpiralIndex(user) {
        if (EditIndex == -1) {
            EditIndex = user.ID;
            this.loadData();
        }
    }
    //редактирование объекта
    onEditSpiralUser(user) {
        if (user) {
            var countOfmatches = 0;//кол-во совпадений- если введенные данные уникальны, то 1 совпадение(сам юзер) если больше, то это проблема
            for (var i = 0; i < this.state.users.length; i++) {
                if (this.state.users[i].Email == user.Email) {
                    countOfmatches++;
                    if (countOfmatches > 1) {
                        alert("Email conflict");
                        //console.log("Email conflict");
                        EditIndex = -1;
                        this.loadData();
                        return;
                    }
                }
            }

            var data = new FormData();
            data.append("id", EditIndex);
            data.append("FirstName", user.FirstName);
            data.append("LastName", user.LastName);
            data.append("Email", user.Email);
            data.append("Passwrd", user.Passwrd);
            data.append("RoleOfUser", user.RoleOfUser);
            data.append("img", user.PhotoPath);

            EditIndex = -1
            var xhr = new XMLHttpRequest();
            xhr.open("post", this.props.editUrl, true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }

    }
    ShowContent(RemoveUser, GetEditIndex, EditUser)
    {
        if (this.state.GoToCourses && Logined.Role ==3)
            return <Courses getUrl="/home/getCourses" postUrl="/home/addCourse" deleteUrl="/home/deleteCourse" />
        else
         return    <div className="tabs">

                    <input id="tab1" type="radio" name="tabs" defaultChecked />
                    <label htmlFor="tab1" title="Users">Users</label>

                    <input id="tab2" type="radio" name="tabs" disabled/>
                    <label htmlFor="tab2" title="Connected">Connected</label>

                    <input id="tab3" type="radio" name="tabs" />
                    <label htmlFor="tab3" title="User">User</label>

                    <button className="btn btn-success"  onClick={() => { this.GoToRegistration() }}>+ Add new user</button>
                    <section id="content-tab1">
                        {
                            this.state.users.map(function (user) {
                                if (user.ID == EditIndex) {//если id пользователя совпадает с id того, кого мы хотим редакти ровать, то выводится форма редактирования вместо списка
                                    return <SpiralUserEditForm user={user} onSpiralUserUpdateSubmit={EditUser } />//Форма редактирования пользователя
                                    }
                                else
                                    return <SpiralUser key={user.ID} user={user} onRemove={RemoveUser} onEdit={GetEditIndex } />//список пользователей
                                    })
                        }
                    </section>
                    <section id="content-tab2">
                                                   
                    </section>
                    <section id="content-tab3">

                        {
                            this.state.users.map(function (user) {
                                if (Logined.Role==user.RoleOfUser && Logined.ID==user.ID )
                                    return <SpiralUser key={user.ID} user={user} onRemove={RemoveUser} onEdit={GetEditIndex} page="second"/>//список пользователей
                                    })
                        }
                    </section>
            </div>
    }
    GoToRegistration()
    {
        ToReg = 2//сообщит о добавлении нового пользователя рендеру
        this.loadData();
    }
//      <div>
//      {
//                                               this.state.users.map(function (user) {
//                                                   if (user.ID == Logined.ID && Logined.Role == 3) //если у пользователя достаточно прав для добавления другого пользователя
//                                                       return (

//                                                       <SpiralUserForm onSpiralUserSubmit={AddUser } />
                                                       
//                                                       );//вызываем форму добавления пользователя
//      })
//}
//                                       </div>
    render() {
        {
            //<img class="img-circle" height="50" src="/Scripts/FrontEnd/images/B.png"/>
            //<input type="file" />

        


            var AddUser = this.onAddSpiralUser;
            if (ToReg == 2) {//Добавить нового пользователя
                return <SpiralUserForm onSpiralUserSubmit={AddUser} />
            }

            if (!Logined)//если пользователь не залогинился
            {
                if (!ToReg)//если пользователь не зарегестрировался
                    return          <div>

                                            <Auentification LoginUrl="/home/Auentification" />
                                   </div>

                else
                    return <SpiralUserForm onSpiralUserSubmit={AddUser} />

            }

            else {
                this.componentWillUnmount();
                var RemoveUser = this.onRemoveSpiralUser;
                var EditUser = this.onEditSpiralUser;
                var GetEditIndex = this.GetEditSpiralIndex;
                return  <div>
                                     




                                  <div>
                                     <div className="row Main">
                                         <div className="col-sm-8 col-xs-8 col-md-8 col-md-offset-2  col-xs-offset-2  col-sm-offset-2">
                                             <div className="HorizontalNavbar">
                                                 <table>
                                                     <tr>
                                                         <td className="col-sm-2 col-xs-2 col-md-2"></td>
                                                         <td className="col-sm-2 col-xs-2 col-md-2 ">My Panel</td>
                                                         <td className="col-sm-6 col-xs-6 col-md-6">+ Add Course</td>
                                                     </tr>
                                                 </table>
                                             </div>

                                                    <div className="col-sm-1 col-xs-1 col-md-1 VerticalNavbar">
                                                             <ul>
                                                                <li id="css-sprite-007" className="col-sm-12 col-xs-12 col-md-12"><p onClick={() => { this.state.GoToCourses = true; this.forceUpdate()}}>Courses</p></li>
                                                                <li id="css-sprite-008" className="col-sm-12 col-xs-12 col-md-12"><p>Workspace</p></li>
                                                                <li id="css-sprite-006" className="col-sm-12 col-xs-12 col-md-12"><p onClick={() => { this.state.GoToCourses = false; this.state.isEdit = false; this.forceUpdate()}}>Users</p></li>
                                                                <li id="css-sprite-001" className="col-sm-12 col-xs-12 col-md-12"><p>Activity</p></li>
                                                                <li id="css-sprite-002" className="col-sm-12 col-xs-12 col-md-12"><p>Workspace</p></li>
                                                                <li id="css-sprite-003" className="col-sm-12 col-xs-12 col-md-12"><p>Mobile upload</p></li>
                                                                <li id="css-sprite-004" className="col-sm-12 col-xs-12 col-md-12"><p>Settings</p></li>
                                                                <li id="css-sprite-005" className="col-sm-12 col-xs-12 col-md-12"><p>My uploads</p></li>
                                                             </ul>

                                                    </div>
                                            {
                                                this.ShowContent(RemoveUser, GetEditIndex, EditUser)
                                            }

                                            
                                         </div>

                                     </div>
                                  </div>



                </div>

            }
        }
    }
}


ReactDOM.render(
  <SpiralUsersList getUrl="/home/getSpiralUser" postUrl="/home/addSpiralUser" deleteUrl="/home/deleteSpiralUser" editUrl="/home/EditSpiralUser" />,
  //<Auentification  LoginUrl="/home/Auentification" />,
  document.getElementById("content")
);
