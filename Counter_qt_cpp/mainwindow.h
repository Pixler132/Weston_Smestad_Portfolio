#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QtSql>
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QDebug>
#include <QSqlDriver>
#include <QString>
#include <QString>
#include <QVariant>
#include <QList>
#include <QMainWindow>
#include <QVector>
#include <QApplication>
#include <QSqlError>


QT_BEGIN_NAMESPACE
namespace Ui {class MainWindow;}
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void on_login_button_clicked();

    void on_register_button_clicked();

    void on_Back_clicked();

    void on_registration_regForm_4_clicked();

    void on_Count_Btn_clicked();
//
private:
    void openDatabaseLocal();
    void CreateDatabase();

    Ui::MainWindow *ui;

    int ID = 0;
    int countValue = 0;

    QSqlDatabase database_name(QSqlDatabase Local);
    QSqlDatabase Local;
};


#endif // MAINWINDOW_H
