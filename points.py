responses = []
points = 0
questions = {}
ghost_points = 0
answers = {}
while True:
    print("Current questions are:\n")
    for question in questions.keys():
        if (questions[question][2] == 0):
            valstr = "Yes"
        else:
            valstr = "No"
        print("\t" + str(questions[question][0]) + ". " + question + "\n\t\tResponses: " + str(questions[question][1]) + "\tValidated: " + valstr)
    response = input("Enter new observation or question: ")
    if (response == 'done'):
        break
    elif (response == "see responses"):
        print(responses)
    else:
        resp = response.split('-')
        responses.append(responses)
        if (resp[0].strip() == 'comment'):
            points += 1
        if resp[0].strip() == 'question':
            if (resp[1].strip() in questions.keys()):
                if (questions[resp[1].strip()][2] == 1):
                    points += 1
                    questions[resp[1].strip()][2] = 0
                    ghost_points -= 1
            else:
                unique_question_count = len(questions.keys())
                questions[resp[1].strip()] = [unique_question_count + 1, 0, 1]
                ghost_points += 1
        elif resp[0].strip()[:6] == 'answer':
            keylist = list(questions.keys())
            questions[keylist[int(resp[0].strip()[6:]) - 1]][1] += 1
            points += 1
        print("(User will see)Total points: " + str(points))
        print("(User won't see)Ghost points: " + str(ghost_points))
        print("==============================================================")