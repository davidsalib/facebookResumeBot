var request = require('request');
var token = "EAAYQyuiljoABABWfDx8QZAtZCkvpkx9TbZAkmv8MehxZAF2OgeQviRxz6nWNW0gxKgMq50vDEMIUY3j2P8t05wq7rOHEbVjCFiRANvetqAgnWqrNX9ZAPpcTrTRgZCi3T1oZBeDPV9hVheJeGAc18E49KiDMkRsRGGTt8CFxiyNyQZDZD";
var resume = require('./resume');

var botHandler = function (sender, payload, type) {
        if (type == "message") {
            payload = text.toLowerCase();
            if (payload.indexOf("experience") > -1 || payload.indexOf("job") > -1 || payload.indexOf("work") > -1) {
                sendJobExperience(sender);
            }
            else if (payload.indexOf('study') > -1 || payload.indexOf("education") > -1 || payload.indexOf("university") > -1) {
                sendEducation(sender);
            }
            else if (payload.indexOf('skills') > -1 || payload.indexOf("coding") > -1 || payload.indexOf("programming") > -1 || payload.indexOf("know") > -1) {
                sendSkillsButtons(sender);
            }
            else if (payload.indexOf("languages") > -1 || payload.indexOf("js") > -1 || payload.indexOf("javascript") > -1) {
                sendSkillsLanguages(sender);
            }
            else if (payload.indexOf("you") > -1 || payload.indexOf("build") > -1 || payload.indexOf("built") > -1 || payload.indexOf("made") > -1 || payload.indexOf("create") > -1) {
                sendHowIWasMade(sender);
            }
            else if (payload.indexOf("project") > -1) {
                sendProjects(sender);
            }
            else if (payload.indexOf('interest') >  -1 || payload.indexOf('hobb') > -1) {
                sendInterests(sender);
            }
            else if (payload.indexOf('hi') > -1 || payload.indexOf('hello') > -1 || payload.indexOf('yo') > -1 || payload.indexOf('hey') > -1) {
                sendTextMessage(sender, "Hi, I'm David's Bot! Ask me about his Skills, Job Experience, Projects, Education, and his Interests.\n\nYou can even ask how he built me :)");
            }
            else if (payload.indexOf('bye') > -1 || payload.indexOf('later') > -1) {
                sendTextMessage(sender, "It was great talking to you! Have a fantastic day :)");
            } else {
                sendTextMessage(sender, "jdudfaSJJdSLEod DJDJe SJSJS... That's how it feels when you send me gibbirish :( How about trying to ask about David's Job Experience, Skills, Projects, Education, or Interests? \n\n Sorry, sometimes I get mad that David didn't build any natural language processing for me. He said he's \"busy\"");
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
                case "projectTechnologies":
                    sendProjectTechnologies(sender, payload.id);
                    break;
                case "languages":
                    sendSkillsLanguages(sender);
                    break;
                case "frameworks":
                    sendSkillsFrameworks(sender);
                    break;
                case "tools":
                    sendSkillsTools(sender);
                    break;
                default:
                    break;
            }
        }
    }
    ;


/** Skills **/
function sendSkillsButtons(sender) {
    buttons = [{
        type: "postback",
        title: "Languages (i.e. C++)",
        payload: "skills:languages"
    }, {
        type: "postback",
        title: "Frameworks (i.e. React)",
        payload: "skills:frameworks"
    }, {
        type: "postback",
        title: "Tools (i.e. Git)",
        payload: "skills:tools"
    }]
    sendTextMessageWithButtons(sender, "Pick a category of technical skills: ", buttons)
}

function sendSkillsLanguages(sender) {
    msg = "Here are the programming languages David is experienced with, I added stars for some flare! \n"
    for (var i = 0; i < resume.technicalSkills.languages.length; i++) {
        msg += "- " + resume.technicalSkills.languages[i].title + "\n";
    }
    sendTextMessage(sender, msg);
}

function sendSkillsFrameworks(sender) {
    msg = "These are the frameworks David uses the most: \n"
    for (var i = 0; i < resume.technicalSkills.frameworks.length; i++) {
        msg += "- " + resume.technicalSkills.frameworks[i].title + "\n";
    }
    sendTextMessage(sender, msg);
}

function sendSkillsTools(sender) {
    msg = "These are some of the common tools David uses while developing \n"
    for (var i = 0; i < resume.technicalSkills.tools.length; i++) {
        msg += "- " + resume.technicalSkills.tools[i].title + "\n";
    }
    sendTextMessage(sender, msg);
}

/** EDUCATION **/
function sendEducation(sender) {
    msg = "Since " + resume.education.startYear + " David has been pursuing a degree in " + resume.education.degree + " at the " + resume.education.institution + " which is expected to be complete in 2019";
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

function sendProjects(sender) {
    var payload = [];
    var projects = resume.projects;
    for (var i = 0; i < projects.length; i++) {
        var item = {
            title: projects[i].title,
            subtitle: projects[i].desc,
            image_url: projects[i].img,
            buttons: [{
                type: "postback",
                title: "Technologies Used",
                payload: projects[i].id + ":projectTechnologies"
            }]
        };
        payload.push(item);
    }

    sendCards(sender, payload);
}

function sendProjectTechnologies(sender, id) {
    var project;
    for (var i = 0; i < resume.projects.length; i++) {
        if (resume.projects[i].id == id) {
            project = resume.projects[i];
        }
    }

    var msg = project.title + ", is built using:\n";

    for (var i = 0; i < project.technologies.length; i++) {
        msg += "- " + project.technologies[i] + "\n";
    }

    sendTextMessage(sender, msg);
}

function sendInterests(sender) {
    var msg = "David's interests include: \n";
    for (var i = 0; i < resume.interests.length; i++) {
        msg += "- " + resume.interests[i] + "\n";
    }
    sendTextMessage(sender, msg);
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


/** FUN **/
function sendHowIWasMade(sender) {
    msg = "Oh, I love this story. David built me in 3 hours on a warm spring day in April of 2016 :D.\n\n";
    msg += "There is a Node.js server hosted on Heroku where your messages are sent through Facebook's Messenger Platform. \n";
    msg += "If you like code, check out my brain on GitHub: https://github.com/davidsalib/facebookResumeBot\n\n";
    msg += "Sincerly,\nBotty";
    sendTextMessage(sender, msg);
}

module.exports = botHandler;
