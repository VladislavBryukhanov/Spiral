class SecondStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            backup: props.courses,                                //Если решим вернуться на предыдущую страницу, возвращаем исходные данные
            courses: {
                isOutdoor: props.courses.isOutdoor,
                isScience: props.courses.isScience,
                isRelations: props.courses.isRelations,
                isNewTheme: props.courses.isNewTheme,
                isPublicTheme: props.courses.isPublicTheme,
                EditTitle: "Edit Title",
                EditSubtitle: "Edit Subtitle",
                WHO: "",
                WHY: "",
                WHAT: ""
            }, Next: null, Prev: null
        }

        this.onEditTitleChange = this.onEditTitleChange.bind(this);
        this.onEditSubtitleChange = this.onEditSubtitleChange.bind(this);
        this.onWHOChange = this.onWHOChange.bind(this);
        this.onWHYChange = this.onWHYChange.bind(this);
        this.onWHATChange = this.onWHATChange.bind(this);

        console.log(this.state);
        if (this.state.backup.EditTitle != undefined) {
            this.state.courses = this.state.backup;
            }
    }


    onEditTitleChange(e) {
        var course = this.state.courses;
        course.EditTitle = e.target.value;
        this.setState({ courses: course });

        //this.state.courses.EditTitle = e.target.value;
    }
    onEditSubtitleChange(e) {
        var course = this.state.courses;
        course.EditSubtitle = e.target.value;
        this.setState({ courses: course });

        //this.state.courses.EditSubtitle = e.target.value;
    }
    onWHOChange(e) {
        var course = this.state.courses;
        course.WHO = e.target.value;
        this.setState({ courses: course });

        //this.state.courses.WHO = e.target.value;
    }
    onWHYChange(e) {
        var course = this.state.courses;
        course.WHY = e.target.value;
        this.setState({ courses: course });

        //this.state.courses.WHY = e.target.value;
    }
    onWHATChange(e) {
        var course = this.state.courses;
        course.WHAT = e.target.value;
        this.setState({ courses: course });

        //this.state.courses.WHAT = e.target.value;
    }

    NextPage(NorP) {//Next or Prev

        if (this.state.Next) {
            if (this.state.courses.EditTitle != "" && this.state.courses.EditSubtitle != "" && this.state.courses.WHO != "" && this.state.courses.WHY != "" && this.state.courses.WHAT != "") {
                CurrentPage = 2;
                return <NewCourse courses={this.state.courses } />
            }
            else {
                alert("Fill all areas");
                this.state.Next = null;
            }
        }
        else if (this.state.Prev)
        {
            CurrentPage = 1;
            console.log(this.state.backup);
            return <NewCourse courses={this.state.backup } />
        }
    }

    render() {
        //console.log(this.state);
        if (this.state.Next || this.state.Prev)
            return this.NextPage();
        else return <div className="SecondStep">
                                    <div className="SecondStepFirstBlock">
                                        <div>2. Write Outline</div>
                                          <div>
                                          <input type="text"
                                                 value={this.state.courses.EditTitle}
                                                 onChange={this.onEditTitleChange} onFocus={(e) => { e.target.value = "" }} />
                                           <input type="text"
                                                  value={this.state.courses.EditSubtitle}
                                                  onChange={this.onEditSubtitleChange} onFocus={(e) => { e.target.value = "" }} />
                                          </div>
                                        <div>#Outdoor</div>
                                   
                                     </div>   

                                        <input type="text"
                                                  className="Asks"
                                                  placeholder="WHO?"
                                                  value={this.state.courses.WHO}
                                                  onChange={this.onWHOChange} />
                                           <input type="text"
                                                  className="Asks"
                                                  placeholder="WHY?"
                                                  value={this.state.courses.WHY}
                                                  onChange={this.onWHYChange} />
                                           <input type="text"
                                                  className="Asks"
                                                  placeholder="WHAT?"
                                                  value={this.state.courses.WHAT}
                                                  onChange={this.onWHATChange} />
                                            <br />
                                           <button className="btn-primary" onClick={() => {this.state.Next = true;
                                                                                                 this.forceUpdate();
                                           }}>
                                               Save
                                           </button>

                                          <button className="btn-primary" onClick={() => {this.state.Prev = true;
                                                                                                 this.forceUpdate();
                                           }}>
                                              Cancel
                                          </button>

        </div>

}
}

