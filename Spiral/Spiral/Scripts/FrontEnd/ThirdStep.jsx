class ThirdStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            backup:props.courses,                                //Если решим вернуться на предыдущую страницу, возвращаем исходные данные
            courses: {
                isOutdoor: props.courses.isOutdoor,
                isScience: props.courses.isScience,
                isRelations: props.courses.isRelations,
                isNewTheme: props.courses.isNewTheme,
                isPublicTheme: props.courses.isPublicTheme,
                EditTitle: props.courses.EditTitle,
                EditSubtitle: props.courses.EditSubtitle,
                WHO: props.courses.WHO,
                WHY: props.courses.WHY,
                WHAT: props.courses.WHAT,

                PurposeGoal: "",
                LearningContent: "",
                Activities: "",
                LearningCourse: "",
                LearningGoals: "",
            }, Next: null, Prev: null
        }

        this.onPurposeGoalChange = this.onPurposeGoalChange.bind(this);
        this.onLearningContentChange = this.onLearningContentChange.bind(this);
        this.onActivitiesChange = this.onActivitiesChange.bind(this);
        this.onLearningCourseChange = this.onLearningCourseChange.bind(this);
        this.onLearningGoalsChange = this.onLearningGoalsChange.bind(this);

        if (this.state.backup.PurposeGoal != undefined) {
            this.state.courses = this.state.backup;
        }
    }
   

    onPurposeGoalChange(e) {
        var course = this.state.courses;
        course.PurposeGoal = e.target.value;
        this.setState({ courses: course });

        //this.state.courses.PurposeGoal = e.target.value;
    }
    onLearningContentChange(e) {
        var course = this.state.courses;
        course.LearningContent = e.target.value;
        this.setState({ courses: course });

        //this.state.courses.LearningContent = e.target.value;
    }
    onActivitiesChange(e) {
        var course = this.state.courses;
        course.Activities = e.target.value;
        this.setState({ courses: course });

        //this.state.courses.Activities = e.target.value;
    }
    onLearningCourseChange(e) {
        var course = this.state.courses;
        course.LearningCourse = e.target.value;
        this.setState({ courses: course });

        //this.state.courses.LearningCourse = e.target.value;
    }
    onLearningGoalsChange(e) {
        var course = this.state.courses;
        course.LearningGoals = e.target.value;
        this.setState({ courses: course });

        //this.state.courses.LearningGoals = e.target.value;
    }

    NextPage(NorP) {//Next or Prev
        console.log(this.state);
        if (this.state.Next) {
            if (this.state.courses.PurposeGoal != "" && this.state.courses.LearningContent != "" && this.state.courses.Activities != "" && this.state.courses.LearningCourse != "" && this.state.courses.LearningGoals != "") {
                CurrentPage = 3;
                return <NewCourse courses={this.state.courses }/>
                }
            else {
                alert("Fill all areas");
                this.state.Next = null;
            }
        }
        else if (this.state.Prev)
        {
            CurrentPage = 2;
            console.log(this.state.backup);
            return <NewCourse courses={this.state.backup }/>
        }
    }

    render() {
        //console.log(this.state);
        if (this.state.Next || this.state.Prev)
            return this.NextPage();
        else return <div className="ThirdStep">

                                           <input type="text"
                                                   value={this.state.courses.PurposeGoal}
                                                   onChange={this.onPurposeGoalChange}/>
                                           <input type="text"
                                                     value={this.state.courses.LearningContent}
                                                     onChange={this.onLearningContentChange} />
                                           <input type="text"
                                                     value={this.state.courses.Activities}
                                                     onChange={this.onActivitiesChange} />
                                           <input type="text"
                                                  value={this.state.courses.LearningCourse}
                                                  onChange={this.onLearningCourseChange} />
                                           <input type="text"
                                                     value={this.state.courses.LearningGoals}
                                                     onChange={this.onLearningGoalsChange} />
                                               
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

