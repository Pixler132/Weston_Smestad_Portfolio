#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}



void MainWindow::on_deCypher_clicked()
{
    std::string c_decypher_text;
    QString decypher_text = ui->deCypher_input->toPlainText();

    c_decypher_text = decypher(decypher_text, c_decypher_text);

    decypher_text = QString::fromStdString(c_decypher_text);
    ui->deCypher_output->setText(decypher_text);

}

void MainWindow::on_Cypher_clicked()
{
    std::string c_cypher_text;
    QString cypher_text = ui->Cypher_input->toPlainText();
qDebug() << "cypher_text";
    c_cypher_text = cypher(cypher_text, c_cypher_text);

    QString output = QString::fromStdString(c_cypher_text);
    ui->Cypher_output->setText(output);

}
