#include "mainwindow.h"
#include "ui_mainwindow.h"

std::string cypher(QString cypher_text, std::string c_cypher_text){
qDebug() << cypher_text;
c_cypher_text = cypher_text.toStdString();
char ch;
int key = 1;
int end = c_cypher_text.size();

for (int i = 0; end != i ; i++)
{
    ch = c_cypher_text[i];

            if(ch >= 'a' && ch <= 'z')
            {
                ch = ch + key;

                if(ch > 'z'){
                    ch = ch - 'z' + 'a' - 1;
                }

                c_cypher_text[i] = ch;
            }
            else if(ch >= 'A' && ch <= 'Z')
            {
                ch = ch + key;

                if(ch > 'Z')
                {
                    ch = ch - 'Z' + 'A' - 1;
                }
                c_cypher_text[i] = ch;
            }
}
return c_cypher_text; // make your end result be the string c_cypherText
// you could also return it as a QString by just using for example QString_of_what_ever_name.toStdString()
// just make sure it returns a string and then your good.
}

