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
    }]
};

var botHandler = function (sender, payload, type) {
    if (type == "message") {
        payload = text.toLowerCase();
        if (payload.indexOf("experience") > -1) {
            sendJobExperience(sender);
        } else {
            sendTextMessage(sender, "Hey, nice to meet you :) Would you like to learn about David Salib? You can ask about Projects, Job Experience, Education, and his Interests. Go ahead, try it!");
        }
    } else if (type == "postback") {
        switch(payload.action) {
            case "jobHighlight":
                sendJobHighlight(sender, payload.id);
                break;
            case "jobDesc":
                sendJobDescription(sender, payload.id);
                break;
            case "jobTechnologies":
                sendJobTechnologies(sender, payload.id);
                break;
            default: break;
        }
    }
};

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
