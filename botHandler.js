var request = require('request');
var token = "EAAYQyuiljoABABWfDx8QZAtZCkvpkx9TbZAkmv8MehxZAF2OgeQviRxz6nWNW0gxKgMq50vDEMIUY3j2P8t05wq7rOHEbVjCFiRANvetqAgnWqrNX9ZAPpcTrTRgZCi3T1oZBeDPV9hVheJeGAc18E49KiDMkRsRGGTt8CFxiyNyQZDZD";

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
        title: "Catena",
        img: "https://www.savannahstate.edu/academic-affairs/images/thailand_pic.jpg"
    }, {
        title: "FHTSystem",
        img: "https://www.savannahstate.edu/academic-affairs/images/thailand_pic.jpg"
    }, {
        title: "Pluto",
        img: "https://www.savannahstate.edu/academic-affairs/images/thailand_pic.jpg"
    }],
    technicalSkills: {
        languages: [{
            title: "JavaScript (ES5 & ES6)",
            level: 5
        }, {
            title: "PHP",
            level: 5
        }, {
            title: "C++",
            level: 5
        }, {
            title: "Objective-C",
            level: 5
        }, {
            title: "Scheme",
            level: 5
        }, {
            title: "PHP",
            level: 5
        }],
        frameworks: [{
            title: "React & React Native",
            level: 5
        }, {
            title: "AngularJS",
            level: 5
        }, {
            title: "Cordova + Ionic",
            level: 5
        }, {
            title: "NodeJS",
            level: 5
        }, {
            title: "Laravel",
            level: 5
        }, {
            title: "Magento",
            level: 5
        }],
        tools: [{
            title: "Git",
            level: 5
        }, {
            title: "MongoDB",
            level: 5
        }, {
            title: "MySQL",
            level: 5
        }, {
            title: "Amazon Web Services",
            level: 5
        }, {
            title: "Heroku",
            level: 5
        }, {
            title: "Redis",
            level: 5
        }]
    }
};

var botHandler = function (sender, payload, type) {
    if (type == "message") {
        payload = text.toLowerCase();
        if (payload.indexOf("experience") > -1 || payload.indexOf("job") > -1) {
            sendJobExperience(sender);
        }
        else if (payload.indexOf('study') > -1 || payload.indexOf("education") > -1 || payload.indexOf("university") > -1) {
            sendEducation(sender);
        }
        else if (payload.indexOf('skills') > -1 || payload.indexOf("coding") > -1 || payload.indexOf("programming") > -1) {
            sendSkillsButtons(sender);
        }
        else if (payload.indexOf("languages") > -1) {
            sendProgrammingLanguages(sender);
        }
        else {
            sendTextMessage(sender, "Hi, I'm David's Bot! Ask me about his Skills, Job Experience, Projects, Education, and his Interests. \n You can even ask how he built me :)");
        }
    } else if (type == "postback") {
        switch (payload.action) {
            case "jobHighlight":
                sendJobHighlight(sender, payload.id);
                break;
            case "jobDesc":
                sendJobDescription(sender, payload.id);
                break;
            case "jobTechnologies":
                sendJobTechnologies(sender, payload.id);
                break;
            case "languages":
                sendSkillsLanguages(sender);
                break;
            default:
                break;
        }
    }
};


/** Skills **/

function sendSkillsButtons(sender) {
    buttons = [{
        type:"postback",
        title:"Languages (i.e. C++)",
        payload:"skills:languages"
    }, {
        type:"postback",
        title:"Frameworks (i.e. React)",
        payload:"skills:frameworks"
    }, {
        type:"postback",
        title:"Tools (i.e. Git)",
        payload:"skills:tools"
    }]
    sendTextMessageWithButtons(sender, "Pick a category of technical skills: ", buttons)
}

function sendSkillsLanguages(sender) {
    msg = "Here are the programming languages David is experienced with, I added stars for some flare! \n"
    for (var i = 0; i < resume.technicalSkills.languages; i++) {
        msg += "- " + resume.technicalSkills.languages[i].title;
        for (var x = 0; i < resume.technicalSkills.languages[i].level; x++) {
            msg += "✩";
        }
        msg += "\n";
    }
    sendTextMessage(sender, msg);
}

/** EDUCATION **/
function sendEducation(sender) {
    msg = "Since " + resume.education.startYear + " David has been persuing a degree in " + resume.education.degree + " at the " + resume.education.institution + " which is expected to be complete in 2019";
    sendTextMessage(sender, msg);
}

/** JOB EXPERIENCE **/
function sendJobDescription(sender, id) {
    var job;
    for (var i = 0; i < resume.jobs.length; i++) {
        if (resume.jobs[i].id == id) {
            job = resume.jobs[i];
        }
    }

    var msg = "At " + job.company + ", David " + job.desc[0];

    sendTextMessage(sender, msg);
}

function sendJobHighlight(sender, id) {
    var job;
    for (var i = 0; i < resume.jobs.length; i++) {
        if (resume.jobs[i].id == id) {
            job = resume.jobs[i];
        }
    }

    var msg = "At " + job.company + ", David " + job.highlightAchievement;

    sendTextMessage(sender, msg);
}

function sendJobTechnologies(sender, id) {
    var job;
    for (var i = 0; i < resume.jobs.length; i++) {
        if (resume.jobs[i].id == id) {
            job = resume.jobs[i];
        }
    }

    var msg = "At " + job.company + ", David worked with:\n";

    for (var i = 0; i < job.technologies.length; i++) {
        msg += "- " + job.technologies[i] + "\n";
    }

    sendTextMessage(sender, msg);
}

function sendJobExperience(sender) {
    var payload = [];
    var jobs = resume.jobs;
    for (var i = 0; i < jobs.length; i++) {
        var item = {
            title: jobs[i].role,
            subtitle: jobs[i].company,
            image_url: jobs[i].img,
            buttons: [{
                type: "postback",
                title: "Tell me more",
                payload: jobs[i].id + ":jobDesc"
            }, {
                type: "postback",
                title: "Highlight Achievement",
                payload: jobs[i].id + ":jobHighlight"
            }, {
                type: "postback",
                title: "Technologies Used",
                payload: jobs[i].id + ":jobTechnologies"
            }]
        };
        payload.push(item);
    }

    sendCards(sender, payload);
}


/** FACEBOOK MESSENGER REQUESTS **/
function sendTextMessage(sender, text) {
    messageData = {
        text: text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

function sendTextMessageWithButtons(sender, text, buttons) {
    messageData = {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: text,
                buttons: buttons
            }
        }
    };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

function sendCards(sender, payload) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": payload
            }
        }
    };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

module.exports = botHandler;
