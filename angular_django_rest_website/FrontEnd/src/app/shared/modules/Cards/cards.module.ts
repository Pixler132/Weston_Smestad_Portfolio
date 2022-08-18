import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../material/material.module'
import { LimitPipe } from '../../pipes/textLimit.pipe'
import { CardType001Component } from './components/cardType001/card.component'
import { CardType002Component } from './components/cardType002/card.component'
import { CardType003Component } from './components/cardType003/card.component'
import { CardType004Component } from './components/cardType004/card.component'
import { CardType005Component } from './components/cardType005/card.component'
import { CardType006Component } from './components/cardType006/card.component'
import { PipeModule } from '../../pipes/pipes.module'
import { CardType007Component } from './components/cardType007/card.component'
import { CardType008Component } from './components/cardType008/card.component'

@NgModule({
  declarations: [
    CardType001Component,
    CardType002Component,
    CardType003Component,
    CardType004Component,
    CardType005Component,
    CardType006Component,
    CardType007Component,
    CardType008Component,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, PipeModule],
  exports: [
    CardType001Component,
    CardType002Component,
    CardType003Component,
    CardType004Component,
    CardType005Component,
    CardType006Component,
    CardType007Component,
    CardType008Component,
  ],
})
export class CardsModule {}
