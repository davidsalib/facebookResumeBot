var resume = {
        name: "David Salib",
        jobs: [{
            id: "SIE",
            img: "http://media.psu.com/media/articles/image/PlayStation%20Logo.jpg",
            company: "Sony Interactive Entertainment",
            role: "Software Engineer",
            startDate: "January 2016",
            endDate: "April 2016",
            desc: [
                "worked on the PlayStation Store and PlayStation Video Apps for iOS and Android."
            ],
            technologies: ["JavaScript", "Objective-C", "CSS3 Animations", "ReactJS", "Backbone.js"],
            highlightAchievement: "developed and released PlayStation Video for Android 8| (https://play.google.com/store/apps/details?id=com.playstation.video)"
        }, {
            id: "FAO",
            img: "https://edge.frankandoak.com/media/stylenote/uploads/2015/03/STORE1.jpg",
            company: "Frank & Oak",
            role: "Web Developer",
            startDate: "May 2015",
            endDate: "September 2015",
            desc: [
                "Developed e-commerce and API tools to support one of North America's fastest growing fashion startups."
            ],
            technologies: ["PHP + Magento", "JavaScript"],
            highlightAchievement: "proposed and developed a customer service tool that replaced Frank & Oak's previous order fulfillment process, improving efficiency by 200% :D"
        }],
        education: {
            institution: "University of Waterloo",
            degree: "Computer Science",
            startYear: 2014,
            endYear: 2019
        },
        projects: [{
            id: "FHT",
            title: "FHTSystem",
            img: "http://davidsalib.com/fbBotPics/fhtImg.png",
            desc: "Built for FHT Association of Ontario to quantitatively measure and manage health programs. Faetures include: patient surveying, indicator data visualization, and program planning.",
            technologies: ["jQuery", "PHP", "MySQL"]
        }, {
            id: "JL",
            title: "JobLot",
            img: "http://davidsalib.com/fbBotPics/joblotLogo.png",
            desc: "Entry-level job search web app with a modern UX and simple resume builder. Created a real-time resume template creator based on custom AngularJS directives.",
            technologies: ["AngularJS", "Laravel/PHP", "MySQL"]
        }, {
            id: "GPLO",
            title: "GoPluto",
            img: "http://res.freestockphotos.biz/pictures/17/17335-a-man-consulting-his-pharmacist-pv.jpg",
            desc: "Built for a Toronto pharmacy to manage clients in senior care facilities. Developed payments with Stripe, Excel imports, PDF exports, and barcode integration",
            technologies: ["AngularJS", "PHP", "MySQL"]
        }],
        technicalSkills: {
            languages: [{
                title: "JavaScript (ES5 & ES6)"
            }, {
                title: "PHP"
            }, {
                title: "C++"
            }, {
                title: "Objective-C"
            }, {
                title: "Scheme"
            }, {
                title: "PHP"
            }],
            frameworks: [{
                title: "React & React Native"
            }, {
                title: "AngularJS"
            }, {
                title: "Cordova + Ionic"
            }, {
                title: "NodeJS"
            }, {
                title: "Laravel"
            }, {
                title: "Magento"
            }],
            tools: [{
                title: "Git"
            }, {
                title: "MongoDB"
            }, {
                title: "MySQL"
            }, {
                title: "Amazon Web Services"
            }, {
                title: "Heroku"
            }, {
                title: "Redis"
            }]
        },
        interests: ["Guitar (Classic + Fingerstyle)", "Basketball", "Photography", "Ping-Pong", "Hiking", "Traveling"]
    }
    ;

module.exports = resume;