class FourthStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: [],
            BasePath: [],
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
                PurposeGoal: props.courses.PurposeGoal,
                LearningContent: props.courses.LearningContent,
                Activities: props.courses.Activities,
                LearningCourse: props.courses.LearningCourse,
                LearningGoals: props.courses.LearningGoals,
                pathToFiles: ""

            }, Next: null, Prev: null
        }

        this.onPathToFilesChange = this.onPathToFilesChange.bind(this);
        this.DeleteImage = this.DeleteImage.bind(this); 
        this.AddNewFileInList = this.AddNewFileInList.bind(this);
        this.IsChecked = this.IsChecked.bind(this);

        if (this.state.backup.pathToFiles != undefined) {
            this.state.courses=this.state.backup;
        }

        //if (isEdit)
        {
            this.loadFiles();
        }
    }
    // загрузка файлов   для четвертого шага
    loadFiles() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/home/GetFiles", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            //console.log(data);
            this.setState({ BasePath: data });
        }.bind(this);
        xhr.send();
    }

    //getBase64(file, i) {
    //    var reader = new FileReader();
    //    var res;
    //    reader.onload = function () {
    //         res = reader.result;
    //         console.log(reader);
    //    };
    //    console.log(reader);
    //    reader.readAsDataURL(file);
    //    return res;
    //}
    getBase64(file, i) {
        var reader = new FileReader();
        reader.onload = () => {
            //var res = reader.result;
            var Base = this.state.BasePath;
            //if (isEdit)
                i = this.state.BasePath.length;
                Base[i] = reader.result;
            this.setState({ BasePath: Base });
             //console.log(event.target.result)
             //console.log(reader);
        };
        reader.readAsDataURL(file);
    }
    onPathToFilesChange(e) {
        console.log(this.state)

        for (var i = 0; i < e.target.files.length; i++)
        {
            this.state.file[i] = e.target.files[i];
            (this.getBase64(this.state.file[i], i));
        }
        this.forceUpdate();
        //this.state.courses.pathToFiles = "/files/"+  this.state.courses.EditTitle + "/";

    }
    NextPage(NorP) {//Next or Prev
        if (this.state.Next)
        {
            //console.log(this.state.courses.pathToFiles);
            //this.state.courses.pathToFiles = "/files/"+  this.state.courses.EditTitle + "/";
            CurrentPage = 4;
            return <NewCourse courses={this.state.courses} Files={this.state.file}/>

        }
        else if (this.state.Prev)
        {
            CurrentPage = 3;
            console.log(this.state.backup);
            return <NewCourse courses={this.state.backup}/>
        }
    }


    ShowImages(Base64, Remover, Add, IsChecked)//сортирует курсы по вкладкам в зависимости от их типа
    {
        if (Base64[0])
        return Base64.map(function (Base) {
                return   <tr className="FilePage">
                                <td><img width="100" src={Base } /><button onClick={() => { Remover(Base) } }>X</button>
                                                                   <input type="checkbox" onChange={(e) => {Add(Base, e);}} checked={IsChecked(Base)}/></td>
                         </tr>
            }
        );
        }
    IsChecked(fileName)
    {
        console.log(fileName);
        console.log(this.state.courses.pathToFiles);
        if (this.state.courses.pathToFiles.indexOf(fileName) + 1)//indexOf() возвращает если не найдено -1, если найдено - позицию вхождения. В js 0==false, любое др. число даёт true;
        {
            return true;
        }
        else return false;
    }
    AddNewFileInList(fileName, e)//Добавляем имя файла, напротив которого стоит галочка, в список файлов привязанных к курсу
    {
        //console.log(fileName); 
        //console.log(this.state.backup); 
        if (e.target.checked) {
            console.log(this.state.courses.pathToFiles);
            this.state.courses.pathToFiles += fileName ;//+ "|"
        }
        else
        {
            this.state.courses.pathToFiles = this.state.courses.pathToFiles.replace(fileName, '');//DeleteFileFromList
            //console.log(this.state.courses.pathToFiles);
            //this.state.courses.pathToFiles.splice(this.state.courses.pathToFiles.indexOf(fileName), 1);//поиск заданого элемента в массиве и удаление его
        }

    }
    DeleteImage(img)
    {
        this.state.BasePath.splice(this.state.BasePath.indexOf(img), 1);//поиск заданого элемента в массиве и удаление его
        
        console.log(img);
        var data = new FormData();
        data.append("file", img);
        var xhr = new XMLHttpRequest();
        xhr.open("delete", "/home/DeleteFile", true);//удаляет файл из папки, если он существует 
        xhr.onload = function () {
            if (xhr.status == 200) {
                this.forceUpdate();
            }
        }.bind(this);
        xhr.send(data);

    }
    render() {
        //if (this.state.BasePath[2])
        //var tmp = this.state.BasePath[2];


        console.log(this.state.BasePath);
        if (this.state.Next || this.state.Prev)
            return this.NextPage();
        else return                 <div>
                                            <input type="file"
                                                   multiple
                                                   onChange={this.onPathToFilesChange} />
                                            <table className="table table-bordered">
                                                        <tbody>
                                                            {     this.ShowImages(this.state.BasePath, this.DeleteImage, this.AddNewFileInList, this.IsChecked)       }
                                                        </tbody>
                                            </table>
                                           <button className="btn-primary" onClick={() => {
                                                                                            this.state.Next = true;
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

//<div>{
//            <img src={tmp} alt="text"/>
//            }
//</div>