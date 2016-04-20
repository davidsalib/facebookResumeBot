var request = require('request');
var token = "EAAYQyuiljoABABWfDx8QZAtZCkvpkx9TbZAkmv8MehxZAF2OgeQviRxz6nWNW0gxKgMq50vDEMIUY3j2P8t05wq7rOHEbVjCFiRANvetqAgnWqrNX9ZAPpcTrTRgZCi3T1oZBeDPV9hVheJeGAc18E49KiDMkRsRGGTt8CFxiyNyQZDZD";

var resume = {
  name: "David Salib",
  jobs: [{
    id: "SIE",
    img: "https://www.savannahstate.edu/academic-affairs/images/thailand_pic.jpg",
    company: "Sony Interactive Entertainment",
    role: "Software Engineer",
    startDate: "January 2016",
    endDate: "April 2016",
    desc: [
      "I worked on the PlayStation Store as well as the PlayStation Video App for iOS and Android."
    ],
    highlightAchievement: "On launch team for PlayStation Video for Android"
  }, {
    id: "FAO",
    img: "https://www.savannahstate.edu/academic-affairs/images/thailand_pic.jpg",
    company: "Frank& Oak",
    role: "Web Developer",
    startDate: "May 2015",
    endDate: "September 2015",
    desc: [
      "Developed ecommerce and API tools to support one of North America's fastest growing fashion startups."
    ],
    highlightAchievement: "David proposed and developed a customer tool that replaced Frank & Oak's previous order fulfillment process, improving efficiency by 200%"
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
  },{
    title: "FHTSystem",
    img: "https://www.savannahstate.edu/academic-affairs/images/thailand_pic.jpg"
  },{
    title: "Pluto",
    img: "https://www.savannahstate.edu/academic-affairs/images/thailand_pic.jpg"
  }]
}

var botHandler = function (sender, text) {
  text = text.toLowerCase();
  if (text.indexOf("experience") > -1) {
    sendJobExperience(sender);
  } else {
    sendTextMessage(sender, "Hey, nice to meet you :) Would you like to learn about David Salib? You can ask about Projects, Job Experience, Education, and his Interests. Go ahead, try it!");
  }
}

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

function sendJobExperience(sender) {
  var payload = [];
  var jobs = resume.jobs;
  for (var i = 0; i < jobs.length; i++) {
    var item =  {
      title: jobs[i].role,
      subtitle: jobs[i].company,
      image_url: jobs[i].img,
      buttons: [{
        type: "postback",
        title: "Tell me more",
        payload: "@"+jobs[i].id+":more"
      }, {
        type: "postback",
        title: "What was your biggest achievement at " + jobs[i].company
      }]
    };
    payload.push(item);
  }

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
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

module.exports = botHandler;
