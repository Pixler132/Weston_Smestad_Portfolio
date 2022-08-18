#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QString>
#include <string>
#include <QtGui>
#include <QStringList>
#include <QPaintEngine>
#include <QDebug>
#include <iostream>
#include <ctype.h>



QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void on_deCypher_clicked();
    void on_Cypher_clicked();


private:
    Ui::MainWindow *ui;
};

std::string cypher(QString cypher_text, std::string c_cypher_text);
std::string decypher(QString decypher_text, std::string c_decypher_text);

#endif // MAINWINDOW_H
