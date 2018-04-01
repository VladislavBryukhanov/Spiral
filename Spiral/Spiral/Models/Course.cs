using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spiral.Models
{
    public class Course
    {
        public int ID { set; get; }
        public int SelectedType { set; get; }

            public bool isOutdoor { set; get; }
            public bool isScience { set; get; }
            public bool isRelations { set; get; }
            public bool isNewTheme { set; get; }
            public bool isPublicTheme { set; get; }

            public string EditTitle { set; get; }
            public string EditSubtitle { set; get; }
            public string WHO{ set; get; }
            public string WHY{ set; get; }
            public string WHAT{ set; get; }

            public string PurposeGoal{ set; get; }
            public string LearningContent{ set; get; }
            public string Activities{ set; get; }
            public string LearningCourse{ set; get; }
            public string LearningGoals { set; get; }

        public string pathToFiles { set; get; }

    }
}