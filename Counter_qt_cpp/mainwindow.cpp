#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    ui->stackedWidget->setCurrentIndex(0);
    openDatabaseLocal();
    CreateDatabase();
}

MainWindow::~MainWindow()//on window close updates database withe the new countvalue
{
            QString sQuery = "update counting set count = ? where id= ?";

            QSqlQuery qry;
                qry.prepare(sQuery);
                qry.addBindValue(ui->lcdNumber->value());
                qry.addBindValue(ID);
            if(!qry.exec())
            {
                qWarning() << "MainWindow::OnSearchClicked - ERROR: " << qry.lastError().text();
            }else
            {
                qDebug() << "input ran";
            }
    delete ui;
}
void MainWindow::CreateDatabase()//checks to find table if null is returned create new table
{
    QSqlQuery query("SELECT name FROM sqlite_master WHERE type='table' AND name='counting';");
    if(!query.first()){
        query.exec("CREATE TABLE counting (ID INTEGER UNIQUE, UserName TEXT UNIQUE, First_Name TEXT, Last_Name TEXT, Password TEXT, Email TEXT UNIQUE, Gender TEXT, Count INTEGER, PRIMARY KEY('ID' AUTOINCREMENT));");
        qWarning() << "Making Table!!";
    }else{qWarning() << "Found it";}

}
void MainWindow::openDatabaseLocal()//checks to see if the database is open if not then open
{
    QString name;
        if(!Local.open())
        {
            Local = database_name(Local);
            Local.open();
            if(Local.open())
            {
                qDebug() << "opened";
            }else
            {
                qDebug() << "closed";
            }
        }else
        {
            Local.close();
            qDebug() << "database shut down";
        }
}
QSqlDatabase MainWindow::database_name(QSqlDatabase Local)//sets location and name of the database
{
    Local = QSqlDatabase::addDatabase("QSQLITE");
    Local.setDatabaseName("./Users.db");
    return Local;
}
void MainWindow::on_login_button_clicked() //checks login and sets counter
{
QString username = ui->username_login->text();
QString password = ui->password_login->text();
QSqlQuery query;
    query.prepare("SELECT ID FROM counting WHERE Username = ? and PassWord = ?");
    query.addBindValue(ui->username_login->text());
    query.addBindValue(ui->password_login->text());
    query.exec();

if(query.next())//returns the ID that matchs username and password
{
ID = query.value(0).toInt();
}

if(ID != 0)//if id returned change window and get count from database then set display value
{
    ui->stackedWidget->setCurrentIndex(2);
    query.prepare("SELECT count FROM counting WHERE ID = ?");
    query.addBindValue(ID);
    query.exec();
    if(query.first())
    {
        countValue = query.value(0).toInt();
        qWarning() << countValue;
        ui->lcdNumber->display(countValue);
    }

}
}
void MainWindow::on_register_button_clicked() //changes the of displayed page index0
{
    ui->stackedWidget->setCurrentIndex(1);

}
void MainWindow::on_Back_clicked()//changes the of displayed page index1
{
    ui->stackedWidget->setCurrentIndex(0);

}
void MainWindow::on_registration_regForm_4_clicked()//adds registration data to the database
{
    QString sQuery = "INSERT INTO counting (Username,First_Name,Last_Name,PassWord,Email,count) "
                     "VALUES (?,?,?,?,?,0);";

    QSqlQuery qry;
        qry.prepare(sQuery);
        qry.addBindValue(ui->username_regForm->text());
        qry.addBindValue(ui->first_name_regForm->text());
        qry.addBindValue(ui->last_name_regForm->text());
        qry.addBindValue(ui->password_regForm->text());
        qry.addBindValue(ui->email_regForm->text());
    if(!qry.exec())
    {
        qWarning() << "MainWindow::OnSearchClicked - ERROR: " << qry.lastError().text();
    }else
    {
        qDebug() << "input ran";
    }
}
void MainWindow::on_Count_Btn_clicked()//adds to the countvalue on display
{
countValue += 1;
    ui->lcdNumber->display(countValue);
}
