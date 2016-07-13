angular.module('starter.services', [])

.factory('ChatService', function() {
	var _chatRef = new Firebase("https://solvestigma.firebaseio.com");

	var service = {
		chatRef: _chatRef,
		chat: new Firechat(_chatRef),
		userData: null,
		userName: null
	};

	service.login = function(userName, callback) {
		service.userName = userName;
		service.chatRef.authAnonymously(function(error, authData) {
			if (error) {
				console.error(error);
				callback();
			} else {
				service.userData = authData;
				service.chat.setUser(authData.uid, userName, callback);
			}
		});
	};

	return service;
})

.value('PretestQuestions', [
	{
		question: "What is your age?",
		rows: [[0, 1], [2, 3], [4]],
		answers: [
		{ mainText: "18-24 years old" },
		{ mainText: "25-30 years old" },
		{ mainText: "31-40 years old" },
		{ mainText: "41-50 years old" },
		{ mainText: "Over 50 years old" }
		]
	}, {
		question: "What is your gender?",
		rows: [[0, 1]],
		answers: [
		{ mainText: "Female" },
		{ mainText: "Male" }
		]
	}, {
		question: "Mental health is defined as...",
		rows: [[0, 1], [2]],
		answers: [
		{ mainText: "A constant feeling of contentment" },
		{
			mainText: "Striking a balance of all aspects of life",
			subText: "social, physical, spiritual, economic"
		},
		{ mainText: "Achieving a period of 12-18 months without a psychotic episode" },
		]
	},{
		question: "Mental illness is...",
		rows: [[0, 1]],
		answers: [
		{ mainText: "A single, rare disorder" },
		{ mainText: "A broad classification of many disorders" }
		]
	},{
		question: "Who is most likely to get a mental illness?",
		rows: [[0, 1], [2]],
		answers: [
		{ mainText: "Poor, uneducated people" },
		{ mainText: "People with stressful jobs" },
		{
			mainText: "Mental illness can affect anyone",
			subText: "regardless of intelligence, social class, or income level"
		}
		]
	},{
		question: "Depression and Bipolar disease are collectively known as...",
		rows: [[0, 1], [2]],
		answers: [
		{ mainText: "Anxiety Disorders" },
		{ mainText: "Mood Disorders" },
		{ mainText: "Personality Disorders" }
		]
	},{
		question: "Panic attacks and phobias are collectively known as...",
		rows: [[0, 1], [2]],
		answers: [
		{ mainText: "Pan-phobic Disorders" },
		{ mainText: "Anxiety Disorders" },
		{ mainText: "Fare-based Conditions" }
		]
	},{
		question: "SAD stands for...",
		rows: [[0, 1], [2]],
		answers: [
		{ mainText: "Simple Anxiety Defect" },
		{ mainText: 'It is a short form for "sadness"' },
		{
			mainText: "Seasonal Affective Disorder",
			subText: "a type of depression that follows a seasonal pattern"
		}
		]
	}
])

.value('MentalDisorders', [
	{
		name: "Bipolar disorder",
		description: "Mania symptoms include periods of elevated mood or irritability. When experiencing a manic episode, a patient often has high energy levels with reduced need for sleep. Less often, people may experience psychosis. Depression symptoms include feeling sad, low energy, low motivation, or loss of interest in previously enjoyable activities.",
		keywords: ["mood", "irritability", "motivation", "sleep", "sad", "energy", "interest"]
	},{
		name: "Major depression",
		description: "The persistent feeling of sadness or loss of interest that characterizes major depression can lead to a range of emotional and physical conditions. These include inability to sleep or concentrate on tasks. Changes in appetite, decreased energy level, and thoughts of suicide are also seen.",
		keywords: ["sad", "interest", "appetite", "sleep", "concentration", "energy"]
	},{
		name: "Schizophrenia",
		description: "Schizophrenia is characterized by abnormal social behavior. In severe cases, patients may see or hear things that aren't real.",
		keywords: ["hallucination", "social", "behaviour"]
	},{
		name: "Dementia",
		description: "Symptoms include forgetfulness, limited social skills, and thinking abilities so impaired that it interferes with daily functioning.",
		keywords: ["forgetfulness", "thinking", "social"]
	},{
		name: "Anxiety disorder",
		description: "Symptoms include stress that's out of proportion to the impact of the event, inability to set aside a worry, and restlessness.",
		keywords: ["stress", "worrying", "restlessness"]
	},{
		name: "Attention-deficit/hyperactivity disorder",
		description: "Symptoms include limited attention and hyperactivity.",
		keywords: ["limited attention", "hyperactivity"]
	},{
		name: "Obsessive compulsive disorder",
		description: "OCD often centers on themes such as a fear of germs or the need to arrange objects in a specific manner. Symptoms usually begin gradually and vary throughout life.",
		keywords: ["fear", "specific", "germs", "arrange objects", "gradually"]
	},{
		name: "Autism",
		description: "The range and severity of symptoms can vary widely. Common symptoms include difficulty with communication, difficulty with social interactions, obsessive interests, and repetitive behaviors.",
		keywords: ["communication", "social", "repetitive", "obsession", "behavior"]
	},{
		name: "Post traumatic stress disorder",
		description: "Symptoms include flashbacks, nightmares, and anxiety.",
		keywords: ["flashbacks", "nightmares", "anxiety"]
	}
])

.value('Resources', {
	"Ice Breakers": [
	{
		name: "Murphy's Law",
		rating: 4,
		image: 'icebreaker-1.jpg',
		bold: "Through this ongoing exercise, the learning point about trainer flexibility and creativity is emphasized, and a high level of interest and involvement is maintained.",
		description: "First recall a time in your (the facilitator) career or life when either yourself or someone else you knew was dealing with mental illness and you weren’t sure how to help. This can be any sort of incident related to mental health. Several volunteers are asked to recall a similar incident that occurred during the facilitation of a workshop or at some other point during their careers. At regular intervals during their three-hour training session, a time for sharing examples of Murphy’s Law is announced. “The examples often provide an opportunity for follow-up on how the situation was handled or how the problem was solved,” says Lancaster."
	}
	],
	"Information": [

	],
	"Case Studies": [
	{
		name: "Case study 1",
		rating: 3.5,
		image: 'case-study-1.jpg',
		bold: "Please write below what community based mental health initiatives you would like to implement.",
		description: "A wildfire has destroyed a season’s worth of crops. Although no one was injured in the fire, the community of 400 is deeply worried about how they will have enough food to last through the winter. There is a sense of worry and fear about the coming months, and this community stress is manifesting itself in both children and adults alike. There is a clinic an hour walk away, and the community is not overly comfortable with the health worker there."
	},{
		name: "Case study 2",
		rating: 2,
		image: 'case-study-2.jpg',
		bold: "Please write below what community based mental health initiatives you would like to implement.",
		description: "In a long-term refugee camp, there has been an outbreak of suicides among young men, some as young as 12. This has resulted in some religious leaders declaring there are demons inhabiting the bodies of these young men, and some “cleansing” rituals have been rumored to be taking place. Although there is a large community health centre run by an international NGO, there is a lack of a workers who speak the local languages. You have been hired to make recommendations on how to approach the situation."
	},{
		name: "Case study 3",
		rating: 5,
		image: 'case-study-3.jpg',
		bold: "Please write below what community based mental health initiatives you would like to implement.",
		description: "In a community that has recently been devastated by a tsunami, a local nurse has reached out to you. She tells you how although she has seen multiple persons who she believes could benefit from talking with a psychologist, the government has been clear that there will not be one available to visit the community for at least four months. The nurse is concerned that waiting is not an appropriate course of action and wants to help her patients now."
	}
	]
});
