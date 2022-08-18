import re

class BugFixing():
    def __init__(self):
        self.specialCharacters = ['.', '+', '*', '?', '^', '$', '(', ')', '[', ']', '{', '}', '|', '\\']
        self.bugParts = []
        self.bugPartsRe = []
        self.fileLines = []

    def getBugFile(self, fileName):
        bugPartFile = open(fileName)
        for line in bugPartFile:
            newLine = line.replace('\n', '')
            newLine = newLine.replace('\t', '')
            self.bugParts.append(newLine)
        bugPartFile.close()
        for x in self.bugParts:
            reLine = ""
            for y in x:
                if y == ' ':
                    reLine += '.'
                elif y in self.specialCharacters:
                    reLine += '\\' + y
                else:
                    reLine += y
            self.bugPartsRe.append(reLine)

    def getLandScapeFile(self, fileName):
        file = open(fileName)
        for line in file:
            self.fileLines.append(line)
        file.close()

    def BugCount(self):
        bugIters = []
        mainComp = re.compile(self.bugPartsRe[0])

        for linePos in range(len(self.fileLines)):  # run for each line
            mainContainer = []
            for m in mainComp.finditer(self.fileLines[linePos]):
                mainContainer.append(m.start())  # find all matches for 1st part of bug
            if len(mainContainer) > 0:  # if match is found
                for y in mainContainer:
                    for x in range(0, len(self.bugParts)):
                        if len(self.fileLines) - linePos - len(self.bugParts) + 1 > 0:  # run for the number of matchs
                            bugIters.append(self.fileLines[linePos + x][y:y + len(self.bugParts[x]) + 1])

        newSet = []
        for x in bugIters:
            newSet.append(x.replace('\n', ''))
        elementNth = len(self.bugParts)
        first = 0
        last = elementNth
        branch = []
        for x in range(int(len(newSet) / elementNth)):
            branch.append(newSet[first:last])
            first = last
            last += elementNth

        bugs = 0
        for x in branch:
            count = 0
            for y in range(len(x)):
                if re.match(self.bugPartsRe[y], x[y]):
                    count += 1
                if count == len(x):
                    bugs += 1
        return bugs


check = BugFixing()
BugFile = 'bug_1_1.txt'
LandScapeFile = 'landscape_1.txt'
check.getBugFile(BugFile)
check.getLandScapeFile(LandScapeFile)
print("There are : " + str(check.BugCount()) + " bugs")
