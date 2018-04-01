
class NewCourse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Files: props.Files,
            courses: { isOutdoor: false, isScience: false, isRelations: false, isNewTheme: false, isPublicTheme: false },
            NewCourse: props.courses, Next: null
        };

        this.onOutdoorChange = this.onOutdoorChange.bind(this);
        this.onScienceChange = this.onScienceChange.bind(this);
        this.onRelationsChange = this.onRelationsChange.bind(this);
        this.onNewThemeChange = this.onNewThemeChange.bind(this);
        this.onPublicThemeChange = this.onPublicThemeChange.bind(this);
        this.onAddCourse = this.onAddCourse.bind(this);
        this.onEditCourse = this.onEditCourse.bind(this);


        if (this.state.NewCourse != undefined) {
            console.log("!!");
            console.log(this.state.NewCourse);
            this.state.courses.isOutdoor = this.state.NewCourse.isOutdoor;
            this.state.courses.isScience = this.state.NewCourse.isScience;
            this.state.courses.isRelations = this.state.NewCourse.isRelations;
            this.state.courses.isNewTheme = this.state.NewCourse.isNewTheme;
            this.state.courses.isPublicTheme = this.state.NewCourse.isPublicTheme;
        }
        else
        {
            this.state.NewCourse = this.state.courses;
        }
        console.log(this.state.courses);
    }


    onOutdoorChange(e) {
        //this.state.courses.isOutdoor = e.target.checked;
        //var course = this.state.courses;
        //course.isOutdoor = e.target.checked;
        //this.setState({ courses: course });

        if (this.state.NewCours == undefined)
            var course = this.state.courses;
        else
            var course = this.state.NewCourse;

        course.isOutdoor = e.target.checked;
        this.setState({ courses: course });

        //console.log(e.target.checked);
        //console.log(this.state.courses.isOutdoor);
    }
    onScienceChange(e) {
        //this.state.courses.isScience = e.target.checked;

        if (this.state.NewCours == undefined)
            var course = this.state.courses;
        else
            var course = this.state.NewCourse;

        course.isScience = e.target.checked;
        this.setState({ courses: course });
    }
    onRelationsChange(e) {
        //this.state.courses.isRelations = e.target.checked;

        if (this.state.NewCours == undefined)
            var course = this.state.courses;
        else
            var course = this.state.NewCourse;

        course.isRelations = e.target.checked;
        this.setState({ courses: course });
    }
    onNewThemeChange(e) {
        //this.state.courses.isNewTheme = e.target.checked;

        if (this.state.NewCours == undefined)
            var course = this.state.courses;
        else
            var course = this.state.NewCourse;

        course.isNewTheme = e.target.checked;
        this.setState({ courses: course });
    }
    onPublicThemeChange(e) {
        //this.state.courses.isPublicTheme = e.target.checked;

        if (this.state.NewCours == undefined)
            var course = this.state.courses;
        else
            var course = this.state.NewCourse;

        course.isPublicTheme = e.target.checked;
        this.setState({ courses: course });

    }
    // добавление объекта
    onAddCourse(NewCourse) {
        //if (course)
        //console.log("start");

        var data = new FormData();
        data.append("SelectedType", 1);
        data.append("EditTitle", this.state.NewCourse.EditTitle);
        data.append("EditSubtitle", this.state.NewCourse.EditSubtitle);
        data.append("WHO", this.state.NewCourse.WHO);
        data.append("WHY", this.state.NewCourse.WHY);
        data.append("WHAT", this.state.NewCourse.WHAT);
        data.append("PurposeGoal", this.state.NewCourse.PurposeGoal);
        data.append("LearningContent", this.state.NewCourse.LearningContent);
        data.append("Activities", this.state.NewCourse.Activities);
        data.append("LearningCourse", this.state.NewCourse.LearningCourse);
        data.append("LearningGoals", this.state.NewCourse.LearningGoals);

        data.append("isOutdoor", this.state.NewCourse.isOutdoor);
        data.append("isScience", this.state.NewCourse.isScience);
        data.append("isRelations", this.state.NewCourse.isRelations);
        data.append("isNewTheme", this.state.NewCourse.isNewTheme);
        data.append("isPublicTheme", this.state.NewCourse.isPublicTheme);

        data.append("pathToFiles", this.state.NewCourse.pathToFiles);

        for (var i = 0; i < this.state.Files.length; i++)
            data.append("files", this.state.Files[i]);

        var xhr = new XMLHttpRequest();
        xhr.open("post", "/home/addCourse", true);
        xhr.onload = function () {
            if (xhr.status == 200) {
                // window.location.reload();
                this.state.Added = true;
                CurrentPage = 1;
                //this.forceUpdate();
            }
        }.bind(this);
        xhr.send(data);
    }

    onEditCourse(NewCourse) {
        //if (course)
        //console.log("start");

        var data = new FormData();
        data.append("ID", this.state.NewCourse.ID);
        data.append("SelectedType", 1);
        data.append("EditTitle", this.state.NewCourse.EditTitle);
        data.append("EditSubtitle", this.state.NewCourse.EditSubtitle);
        data.append("WHO", this.state.NewCourse.WHO);
        data.append("WHY", this.state.NewCourse.WHY);
        data.append("WHAT", this.state.NewCourse.WHAT);
        data.append("PurposeGoal", this.state.NewCourse.PurposeGoal);
        data.append("LearningContent", this.state.NewCourse.LearningContent);
        data.append("Activities", this.state.NewCourse.Activities);
        data.append("LearningCourse", this.state.NewCourse.LearningCourse);
        data.append("LearningGoals", this.state.NewCourse.LearningGoals);

        data.append("isOutdoor", this.state.NewCourse.isOutdoor);
        data.append("isScience", this.state.NewCourse.isScience);
        data.append("isRelations", this.state.NewCourse.isRelations);
        data.append("isNewTheme", this.state.NewCourse.isNewTheme);
        data.append("isPublicTheme", this.state.NewCourse.isPublicTheme);

        data.append("pathToFiles", this.state.NewCourse.pathToFiles);

        if (this.state.Files)
        {
            for (var i = 0; i < this.state.Files.length; i++)
                data.append("files", this.state.Files[i]);
        }
        

        var xhr = new XMLHttpRequest();
        xhr.open("post", "/home/editCourse", true);
        xhr.onload = function () {
            if (xhr.status == 200) {
                // window.location.reload();
                this.state.Added = true;
                isEdit = false;
                CurrentPage = 1;
                //this.forceUpdate();
            }
        }.bind(this);
        xhr.send(data);
    }


    NextPage() {
        //window.location.reload();
        //courses.isOutdoor
        //courses.isScience
        //courses.isRelations
        //courses.isNewTheme
        //courses.isPublicTheme

        //console.log("test");
        //console.log(this.state.CurrentPage);
        //console.log(this.state);
        //this.props.onSpiralUserSubmit({ FirstName: userFirstName, LastName: userLastName, Email: userEmail, PhotoPath: file, RoleOfUser: userRoleOfUser, Passwrd: userPasswrd });
        //this.setState({ FirstName: "", LastName: "", Email: "", Passwrd: "", PhotoPath: "", RoleOfUser: 1 });
        //console.log(isEdit);

        switch (CurrentPage) {
            case 1: {
                //if (this.state.isEditState != undefined)
                {
                    console.log(this.state); return <SecondStep courses={this.state.NewCourse } />; break;
                }
                //else
                //    return <SecondStep courses={this.state.courses } />; break;
            }
            case 2: return <ThirdStep courses={this.state.NewCourse } />; break;
            case 3: return <FourthStep courses={this.state.NewCourse } />; break;
            case 4: if (isEdit)
                        this.onEditCourse();
                    else
                        this.onAddCourse(); break;
        }
    }
    //IsChecked()
    //{
    //    if ( this.state.NewCourse && this.state.NewCourse.isOutdoor)
    //        return true;
    //    else return false;
    //}
    render() {
        var Hidden = "";//Позволит скрывать кнопку "назад" на первом этапе создания страницы или в режиме редатирования
        var ButtonNextSave = "Next";//Название кнопки 
        if (CurrentPage == 1 || isEdit)
            Hidden = "Hidden";
        if (this.state.Added)
            return <Courses getUrl="/home/getCourses" postUrl="/home/addCourse" deleteUrl="/home/deleteCourse" />//Если курс создан, то отправляет на начальную страницу
        //var IsChecked=false;
        //console.log(this.state);
        //if (this.state.NewCours != undefined) {
        //    IsChecked = this.state.NewCourse.isOutdoor;
        //    console.log(this.state.NewCourse.isOutdoor);
        //}
        //else
        //    IsChecked = this.state.courses.isOutdoor;

        //console.log(this.state.courses.isOutdoor);
      
        var Selected = ["NewCourse", "NewCourse", "NewCourse", "NewCourse"];
        {
            if (this.state.NewCourse) {
                if (this.state.NewCourse.pathToFiles != undefined && CurrentPage == 4 || isEdit) { Selected[0] = Selected[1] = Selected[2] = Selected[3] = "Selected"; ButtonNextSave="Save" }
                else if (this.state.NewCourse.PurposeGoal != undefined && CurrentPage == 3 || isEdit) { Selected[0] = Selected[1] = Selected[2] = "Selected"; }
                else if (this.state.NewCourse.EditTitle != undefined && CurrentPage == 2 || isEdit) { Selected[0] = Selected[1] = "Selected"; }
            }
            
        }
        //console.log(this.state);
        if (this.state.Next && this.NextPage())
            return this.NextPage();
        else return <div>
                                                <table>
                                                    <tr>
                                                        <td><div className={Selected[0]}>
                                                        1</div></td>
                                                        <td><div className="NewCourse">Selected type</div></td>
                                                        <td>
                                                            <div className="NewCourse">
                                                                outdoor
                                                                <input type="checkbox" name="isOutdoor" onChange={this.onOutdoorChange} checked={this.state.courses.isOutdoor} />
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="NewCourse">
                                                                science
                                                                <input type="checkbox" onChange={this.onScienceChange} checked={this.state.courses.isScience} />
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="NewCourse">
                                                                relations
                                                                <input type="checkbox" onChange={this.onRelationsChange} checked={this.state.courses.isRelations} />
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="NewCourse">
                                                                new theme
                                                                <input type="checkbox" onChange={this.onNewThemeChange} checked={this.state.courses.isNewTheme} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="NewCourse">
                                                                public theme
                                                                <input type="checkbox" onChange={this.onPublicThemeChange} checked={this.state.courses.isPublicTheme} />
                                                            </div>
                                                        </td>
                                                    </tr>


                                                      <tr>
                                                        <td><div className={Selected[1]} onClick={() => {
                                                            if (isEdit) {
                                                                CurrentPage = 1;
                                                                this.state.Next = true;
                                                                this.forceUpdate();
                                                            }
                                                                                                        }}>
                                                            2</div></td>
                                                        <td><div className="NewCourse">Short Synopsis</div></td>
                                                        <td>
                                                            <div className="NewCourse">
                                                                WHO?
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="NewCourse">
                                                                WHY?
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="NewCourse">
                                                                WHAT?
                                                            </div>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td><div className={Selected[2]} onClick={() => {
                                                            if (isEdit) {
                                                                CurrentPage = 2;
                                                                this.state.Next = true;
                                                                this.forceUpdate();
                                                            }
                                                                                                        }}>
                                                            3</div></td>
                                                        <td><div className="NewCourse">The four D's</div></td>
                                                        <td>
                                                            <div className="NewCourse">
                                                                Fase 1
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="NewCourse">
                                                                Fase  2
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="NewCourse">
                                                                Fase 3
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="NewCourse">
                                                                Fase 4
                                                            </div>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td><div className={Selected[3]} onClick={() => {
                                                            if (isEdit) {
                                                                CurrentPage = 3;
                                                                this.state.Next = true;
                                                                this.forceUpdate();
                                                            }
                                                                                                        }}>
                                                            4</div></td>
                                                        <td><div className="NewCourse">Insert Recordings</div></td>
                                                        <td>
                                                            <div className="NewCourse">
                                                                Sound
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="NewCourse">
                                                                Video
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="NewCourse">
                                                                Pictures
                                                            </div>
                                                        </td>
                                                      </tr>
                                                </table>

                                               <button className={Hidden + " btn-primary"}  onClick={() => {
                                                                                             this.state.Next = true;
                                                                                             CurrentPage--;
                                                                                             this.forceUpdate();
                                                                                             }}>
                                                   Back
                                               </button>

                                                 <button className="btn-primary" onClick={() => {this.state.Next = true;
                                                                                                 if(ButtonNextSave=="Save")
                                                                                                     CurrentPage=4;
                                                                                                 this.forceUpdate();
                                                                                                    }}>
                                                     {ButtonNextSave}
                                                 </button>
                                              

        </div>

    }
}




//ReactDOM.render(
//  <NewCourse getUrl="/home/getCourses" postUrl="/home/addCourse" deleteUrl="/home/deleteCourse" />,
//  document.getElementById("content")
//);

//<NewCourse getUrl="/home/getCourses" postUrl="/home/addCourse" deleteUrl="/home/deleteCourse" isEditState={true} courses={this.state.courses} />

//function handleClick(e, data) {
//    console.log(data);
//}

//courses: {
//        isOutdoor: props.courses.isOutdoor,
//        isScience: props.courses.isScience,
//        isRelations: props.courses.isRelations,
//        isNewTheme: props.courses.isNewTheme,
//        isPublicTheme: props.courses.isPublicTheme,
//        EditTitle: props.courses.EditTitle,
//        EditSubtitle: props.courses.EditSubtitle,
//        WHO: props.courses.WHO,
//        WHY: props.courses.WHY,
//        WHAT: props.courses.WHAT,
//        PurposeGoal: props.courses.PurposeGoal,
//        LearningContent: props.courses.LearningContent,
//        Activities: props.courses.Activities,
//        LearningCourse: props.courses.LearningCourse,
//        LearningGoals: props.courses.LearningGoals,
//        pathToFiles: props.courses.pathToFiles
//},













//работа с файлами(4-й шаг) редактирование, контекст меню и верстка, сохранение значений чекбоксов при возвращении на предыдущий шаг