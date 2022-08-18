#include "mainwindow.h"
#include "ui_mainwindow.h"

std::string decypher(QString decypher_text, std::string c_decypher_text){
qDebug() << decypher_text;
std::string context = decypher_text.toStdString();

for(int i = 0 ; i< decypher_text.size(); i++)
{
    if(context[i] == ' '){continue;}
    else if(context[i] == 'a' ){context[i] = 'z'; continue;}
    char c = context[i];
    c = c - 1;
    if(isalpha(c)){
    context[i] = c;
    }
}


QString copy = QString::fromStdString(context);

return copy.toStdString(); // the decyphered textff
}
