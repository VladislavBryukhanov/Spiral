class Courses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            IDToRemove : null,
            GoToEdit: null,
            GoToAdd: null
        };
        this.onRemoveCourse = this.onRemoveCourse.bind(this);
        this.ContentToTab = this.ContentToTab.bind(this);
        this.onEditType = this.onEditType.bind(this);
        this.onEditCourse = this.onEditCourse.bind(this);
    }
    // загрузка данных
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.getUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ courses: data });
        }.bind(this);
        xhr.send();
    }
   
    componentDidMount() {
        //this.onRemoveCourse();
        //this.onAddCourse();
        this.loadData();
    }

    // удаление объекта
    onRemoveCourse(course) {
        if (course) {
            console.log(course.ID);
            var data = new FormData();
            data.append("id", course.ID);

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


    onEditType(State) {
        //if (course)
        //console.log("start");
        console.log(State);
        console.log(this.state.IDToRemove);

        var data = new FormData();
        data.append("ID", this.state.IDToRemove);
        data.append("SelectedType", State);

        var xhr = new XMLHttpRequest();
        xhr.open("post", "/home/editCourseType", true);
        xhr.onload = function () {
            if (xhr.status == 200) {
                // window.location.reload();
                this.loadData();
                //this.forceUpdate();
            }
        }.bind(this);
        xhr.send(data);
    }

    ContentToTab(courses, type, Remover, Editor)//сортирует курсы по вкладкам в зависимости от их типа
    {
        console.log(this.state.GoToEdit);
        if (this.state.GoToEdit != null)
        {
            isEdit = true;
            return <NewCourse getUrl="/home/getCourses" postUrl="/home/addCourse" deleteUrl="/home/deleteCourse" courses={this.state.GoToEdit} />
        }
        else if (this.state.GoToAdd)//
            return <NewCourse getUrl="/home/getCourses" postUrl="/home/addCourse" deleteUrl="/home/deleteCourse" />//

        else {
            return courses.map( (cours)=> {
                //console.log(cours);
                var SendedType;
                switch (type) {
                    case "circleOrange": SendedType = 1; break;
                    case "circleBlue": SendedType = 2; break;
                    case "circleGreen": SendedType = 3; break;
                    case "circleRed": SendedType = 4; break;
                }

                if (cours.SelectedType == SendedType) {
                    return <div className="Cours">
                                <button className="Del" onClick={() => { Remover(cours) } }>X</button>
                                <button className="Edit" onClick={() => { Editor(cours)  } }>Edit</button>
                                <img src="/images/loading.gif" />
                                <br />{cours.EditTitle}
                                <br />{cours.EditSubtitle}
                                <div className={type} onContextMenu={(e) => {
                                    ContextMenu.style.top = e.clientY+'px';
                                    ContextMenu.style.left = e.clientX  + 'px';
                                    ContextMenu.style.display = "inline";
                                    //ContextMenu.onClick=alert(cours.ID);
                                    //this.setState({ IDToRemove: cours.ID });
                                    this.state.IDToRemove = cours.ID;
                                    e.preventDefault();//Блокирует стандартное контекст меню браузера
                                }}></div>
                    </div>
                }
            });
        }
    }
    onEditCourse(cours) {
        this.state.GoToEdit = cours;
        this.forceUpdate();
    }

    render() {
        {
            var ToRemove = this.onRemoveCourse;
            var ToEdit = this.onEditCourse;
            //console.log(this.state.courses)
            //this.onRemoveSpiralUser();
            //ShowContent = this.ContentToTab(this.state.courses);
            //console.log(ShowContent);

            //if (this.state.GoToAdd)
            //    return <NewCourse getUrl="/home/getCourses" postUrl="/home/addCourse" deleteUrl="/home/deleteCourse" />
            //else
                return <div className="tabs" onClick={() => { ContextMenu.style.display = "none"; }}>

                        <div id="ContextMenu">
    			                    <ul>
					                    <li><div className="Circle Orange"></div><a onClick={() => { this.onEditType(1) }}>Construction</a></li>
					                    <li><div className="Circle Green"></div><a onClick={() => { this.onEditType(3) }}>Public</a></li>
					                    <li><div className="Circle Blue"></div><a onClick={() => { this.onEditType(2) }}>Intern</a></li>
					                    <li><div className="Circle Red"></div><a onClick={() => { this.onEditType(4) }}>Deletion</a></li>
    			                    </ul>
                        </div>

                                                <button onClick={() => { this.state.GoToAdd = true; this.forceUpdate();}}>ADD</button>

                                                <input id="tab1" type="radio" name="tabs" defaultChecked />
                                                <label htmlFor="tab1" title="Construction">Construction items</label>

                                                <input id="tab2" type="radio" name="tabs" />
                                                <label htmlFor="tab2" title="Public">Public items</label>

                                                <input id="tab3" type="radio" name="tabs" />
                                                <label htmlFor="tab3" title="Intern">Intern items</label>

                                                <input id="tab4" type="radio" name="tabs" />
                                                <label htmlFor="tab4" title="Deletion">Deletion items</label>

                                                <section id="content-tab1">{     this.ContentToTab(this.state.courses, "circleOrange", ToRemove, ToEdit)        }
                                                </section>
                                                <section id="content-tab2">{     this.ContentToTab(this.state.courses, "circleGreen", ToRemove, ToEdit)       }
                                                </section>
                                                <section id="content-tab3">{     this.ContentToTab(this.state.courses, "circleBlue", ToRemove, ToEdit)        }
                                                </section>
                                                <section id="content-tab4">{     this.ContentToTab(this.state.courses, "circleRed", ToRemove, ToEdit)       }
                                                </section>
                </div>


        }
    }
}


//ReactDOM.render(
//  <Courses getUrl="/home/getCourses" postUrl="/home/addCourse" deleteUrl="/home/deleteCourse" />,
//  document.getElementById("content")
//);

//function handleClick(e, data) {
//    console.log(data);
//}
/*
function MyApp() {
    return (
        <div>

            <ContextMenuTrigger id="some_unique_identifier">
                <div className="well">Right click to see the menu</div>
            </ContextMenuTrigger>

            <ContextMenu id="some_unique_identifier">
                <MenuItem data={"some_data"} onClick={this.handleClick}>
                    ContextMenu Item 1
                </MenuItem>
                <MenuItem data={"some_data"} onClick={this.handleClick}>
                    ContextMenu Item 2
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={"some_data"} onClick={this.handleClick}>
                    ContextMenu Item 3
                </MenuItem>
            </ContextMenu>

        </div>
    );
}

ReactDOM.render(<MyApp myProp={12} />, document.getElementById("main"));
*/
