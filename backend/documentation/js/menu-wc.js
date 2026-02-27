'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nuct documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-a6bcd850ad8f112eb32fca0b502786321b37f80dfb60d8e64386d8bae349f6e5ee42c9436dfb1f35461cb4328c3864c784f5544e91e8b24950adf8a6df7c1d61"' : 'data-bs-target="#xs-injectables-links-module-AppModule-a6bcd850ad8f112eb32fca0b502786321b37f80dfb60d8e64386d8bae349f6e5ee42c9436dfb1f35461cb4328c3864c784f5544e91e8b24950adf8a6df7c1d61"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a6bcd850ad8f112eb32fca0b502786321b37f80dfb60d8e64386d8bae349f6e5ee42c9436dfb1f35461cb4328c3864c784f5544e91e8b24950adf8a6df7c1d61"' :
                                        'id="xs-injectables-links-module-AppModule-a6bcd850ad8f112eb32fca0b502786321b37f80dfb60d8e64386d8bae349f6e5ee42c9436dfb1f35461cb4328c3864c784f5544e91e8b24950adf8a6df7c1d61"' }>
                                        <li class="link">
                                            <a href="injectables/IdempotenceInterceptor.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IdempotenceInterceptor</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtAuthGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TransformInterceptor.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransformInterceptor</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-edb2d214086a062cbc3a0f7c4e7d00d1a35a1b22091e801fba95049579d4102771fc0acc8b88ee5b1270a910805dbb54f3b14d833b6518083a0298e0a3409dee"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-edb2d214086a062cbc3a0f7c4e7d00d1a35a1b22091e801fba95049579d4102771fc0acc8b88ee5b1270a910805dbb54f3b14d833b6518083a0298e0a3409dee"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-edb2d214086a062cbc3a0f7c4e7d00d1a35a1b22091e801fba95049579d4102771fc0acc8b88ee5b1270a910805dbb54f3b14d833b6518083a0298e0a3409dee"' :
                                            'id="xs-controllers-links-module-AuthModule-edb2d214086a062cbc3a0f7c4e7d00d1a35a1b22091e801fba95049579d4102771fc0acc8b88ee5b1270a910805dbb54f3b14d833b6518083a0298e0a3409dee"' }>
                                            <li class="link">
                                                <a href="controllers/AccountController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/CaptchaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaptchaController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/EmailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-edb2d214086a062cbc3a0f7c4e7d00d1a35a1b22091e801fba95049579d4102771fc0acc8b88ee5b1270a910805dbb54f3b14d833b6518083a0298e0a3409dee"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-edb2d214086a062cbc3a0f7c4e7d00d1a35a1b22091e801fba95049579d4102771fc0acc8b88ee5b1270a910805dbb54f3b14d833b6518083a0298e0a3409dee"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-edb2d214086a062cbc3a0f7c4e7d00d1a35a1b22091e801fba95049579d4102771fc0acc8b88ee5b1270a910805dbb54f3b14d833b6518083a0298e0a3409dee"' :
                                        'id="xs-injectables-links-module-AuthModule-edb2d214086a062cbc3a0f7c4e7d00d1a35a1b22091e801fba95049579d4102771fc0acc8b88ee5b1270a910805dbb54f3b14d833b6518083a0298e0a3409dee"' }>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabaseModule-09c639eda9c8f5609fec863d739bb20415ae5b027a2e3d6475e5d967226c6d5664d15fd99cbef410eb3e6b9e519848d5e383a77b2ef0ec218fe3e14106b6e764"' : 'data-bs-target="#xs-injectables-links-module-DatabaseModule-09c639eda9c8f5609fec863d739bb20415ae5b027a2e3d6475e5d967226c6d5664d15fd99cbef410eb3e6b9e519848d5e383a77b2ef0ec218fe3e14106b6e764"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabaseModule-09c639eda9c8f5609fec863d739bb20415ae5b027a2e3d6475e5d967226c6d5664d15fd99cbef410eb3e6b9e519848d5e383a77b2ef0ec218fe3e14106b6e764"' :
                                        'id="xs-injectables-links-module-DatabaseModule-09c639eda9c8f5609fec863d739bb20415ae5b027a2e3d6475e5d967226c6d5664d15fd99cbef410eb3e6b9e519848d5e383a77b2ef0ec218fe3e14106b6e764"' }>
                                        <li class="link">
                                            <a href="injectables/EntityExistConstraint.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EntityExistConstraint</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UniqueConstraint.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UniqueConstraint</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeptModule.html" data-type="entity-link" >DeptModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DeptModule-97e7d2c2dc04a11987c8fa238fb3eea9257ce55694acfed1c9de3226a2e87e4ef749fbd372add9c675d6fe568cc4343408997abda713fb3aca995097cfeb3aab"' : 'data-bs-target="#xs-controllers-links-module-DeptModule-97e7d2c2dc04a11987c8fa238fb3eea9257ce55694acfed1c9de3226a2e87e4ef749fbd372add9c675d6fe568cc4343408997abda713fb3aca995097cfeb3aab"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DeptModule-97e7d2c2dc04a11987c8fa238fb3eea9257ce55694acfed1c9de3226a2e87e4ef749fbd372add9c675d6fe568cc4343408997abda713fb3aca995097cfeb3aab"' :
                                            'id="xs-controllers-links-module-DeptModule-97e7d2c2dc04a11987c8fa238fb3eea9257ce55694acfed1c9de3226a2e87e4ef749fbd372add9c675d6fe568cc4343408997abda713fb3aca995097cfeb3aab"' }>
                                            <li class="link">
                                                <a href="controllers/DeptController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeptController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DeptModule-97e7d2c2dc04a11987c8fa238fb3eea9257ce55694acfed1c9de3226a2e87e4ef749fbd372add9c675d6fe568cc4343408997abda713fb3aca995097cfeb3aab"' : 'data-bs-target="#xs-injectables-links-module-DeptModule-97e7d2c2dc04a11987c8fa238fb3eea9257ce55694acfed1c9de3226a2e87e4ef749fbd372add9c675d6fe568cc4343408997abda713fb3aca995097cfeb3aab"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DeptModule-97e7d2c2dc04a11987c8fa238fb3eea9257ce55694acfed1c9de3226a2e87e4ef749fbd372add9c675d6fe568cc4343408997abda713fb3aca995097cfeb3aab"' :
                                        'id="xs-injectables-links-module-DeptModule-97e7d2c2dc04a11987c8fa238fb3eea9257ce55694acfed1c9de3226a2e87e4ef749fbd372add9c675d6fe568cc4343408997abda713fb3aca995097cfeb3aab"' }>
                                        <li class="link">
                                            <a href="injectables/TodoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DictItemModule.html" data-type="entity-link" >DictItemModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DictItemModule-21c6e706c6277c66d6ed9d4a3612e8704caf2e89114fe2de4d4e53d60c42478e82b09affac00a81dbce0a758558fff21ba530b99f617eeb3f6e67ed3233e2957"' : 'data-bs-target="#xs-controllers-links-module-DictItemModule-21c6e706c6277c66d6ed9d4a3612e8704caf2e89114fe2de4d4e53d60c42478e82b09affac00a81dbce0a758558fff21ba530b99f617eeb3f6e67ed3233e2957"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DictItemModule-21c6e706c6277c66d6ed9d4a3612e8704caf2e89114fe2de4d4e53d60c42478e82b09affac00a81dbce0a758558fff21ba530b99f617eeb3f6e67ed3233e2957"' :
                                            'id="xs-controllers-links-module-DictItemModule-21c6e706c6277c66d6ed9d4a3612e8704caf2e89114fe2de4d4e53d60c42478e82b09affac00a81dbce0a758558fff21ba530b99f617eeb3f6e67ed3233e2957"' }>
                                            <li class="link">
                                                <a href="controllers/DictItemController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DictItemController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DictItemModule-21c6e706c6277c66d6ed9d4a3612e8704caf2e89114fe2de4d4e53d60c42478e82b09affac00a81dbce0a758558fff21ba530b99f617eeb3f6e67ed3233e2957"' : 'data-bs-target="#xs-injectables-links-module-DictItemModule-21c6e706c6277c66d6ed9d4a3612e8704caf2e89114fe2de4d4e53d60c42478e82b09affac00a81dbce0a758558fff21ba530b99f617eeb3f6e67ed3233e2957"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DictItemModule-21c6e706c6277c66d6ed9d4a3612e8704caf2e89114fe2de4d4e53d60c42478e82b09affac00a81dbce0a758558fff21ba530b99f617eeb3f6e67ed3233e2957"' :
                                        'id="xs-injectables-links-module-DictItemModule-21c6e706c6277c66d6ed9d4a3612e8704caf2e89114fe2de4d4e53d60c42478e82b09affac00a81dbce0a758558fff21ba530b99f617eeb3f6e67ed3233e2957"' }>
                                        <li class="link">
                                            <a href="injectables/TodoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DictTypeModule.html" data-type="entity-link" >DictTypeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DictTypeModule-48423e92d4c9fd1b37c5e6862b2507d35d6a08540ac4c789ed8263cf2c663a62e1111101954d964af144c46dd183c1a9125871a25635f8226079dff31f88697d"' : 'data-bs-target="#xs-controllers-links-module-DictTypeModule-48423e92d4c9fd1b37c5e6862b2507d35d6a08540ac4c789ed8263cf2c663a62e1111101954d964af144c46dd183c1a9125871a25635f8226079dff31f88697d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DictTypeModule-48423e92d4c9fd1b37c5e6862b2507d35d6a08540ac4c789ed8263cf2c663a62e1111101954d964af144c46dd183c1a9125871a25635f8226079dff31f88697d"' :
                                            'id="xs-controllers-links-module-DictTypeModule-48423e92d4c9fd1b37c5e6862b2507d35d6a08540ac4c789ed8263cf2c663a62e1111101954d964af144c46dd183c1a9125871a25635f8226079dff31f88697d"' }>
                                            <li class="link">
                                                <a href="controllers/DictTypeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DictTypeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DictTypeModule-48423e92d4c9fd1b37c5e6862b2507d35d6a08540ac4c789ed8263cf2c663a62e1111101954d964af144c46dd183c1a9125871a25635f8226079dff31f88697d"' : 'data-bs-target="#xs-injectables-links-module-DictTypeModule-48423e92d4c9fd1b37c5e6862b2507d35d6a08540ac4c789ed8263cf2c663a62e1111101954d964af144c46dd183c1a9125871a25635f8226079dff31f88697d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DictTypeModule-48423e92d4c9fd1b37c5e6862b2507d35d6a08540ac4c789ed8263cf2c663a62e1111101954d964af144c46dd183c1a9125871a25635f8226079dff31f88697d"' :
                                        'id="xs-injectables-links-module-DictTypeModule-48423e92d4c9fd1b37c5e6862b2507d35d6a08540ac4c789ed8263cf2c663a62e1111101954d964af144c46dd183c1a9125871a25635f8226079dff31f88697d"' }>
                                        <li class="link">
                                            <a href="injectables/TodoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link" >EmailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EmailModule-bea0996c7271c3b29acb985acd04d465e78ab0727851c840c0797a19c8e54259eab0862d62cba2c308426b3be4de690fb7b6b30d233c80b1557c8bd7a4857f05"' : 'data-bs-target="#xs-controllers-links-module-EmailModule-bea0996c7271c3b29acb985acd04d465e78ab0727851c840c0797a19c8e54259eab0862d62cba2c308426b3be4de690fb7b6b30d233c80b1557c8bd7a4857f05"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmailModule-bea0996c7271c3b29acb985acd04d465e78ab0727851c840c0797a19c8e54259eab0862d62cba2c308426b3be4de690fb7b6b30d233c80b1557c8bd7a4857f05"' :
                                            'id="xs-controllers-links-module-EmailModule-bea0996c7271c3b29acb985acd04d465e78ab0727851c840c0797a19c8e54259eab0862d62cba2c308426b3be4de690fb7b6b30d233c80b1557c8bd7a4857f05"' }>
                                            <li class="link">
                                                <a href="controllers/EmailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-214838786901b4bea4d85d5fe1617a2467ece7349074cd6e3575274c11082f0d71278d825c204e768b9e576328cbad2ce61614bdb3b502d09728801c2cccf75d"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-214838786901b4bea4d85d5fe1617a2467ece7349074cd6e3575274c11082f0d71278d825c204e768b9e576328cbad2ce61614bdb3b502d09728801c2cccf75d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-214838786901b4bea4d85d5fe1617a2467ece7349074cd6e3575274c11082f0d71278d825c204e768b9e576328cbad2ce61614bdb3b502d09728801c2cccf75d"' :
                                            'id="xs-controllers-links-module-HealthModule-214838786901b4bea4d85d5fe1617a2467ece7349074cd6e3575274c11082f0d71278d825c204e768b9e576328cbad2ce61614bdb3b502d09728801c2cccf75d"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelperModule.html" data-type="entity-link" >HelperModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HelperModule-82f9c00bc81808bec5c15d7b7712b17de02697e32b1af7528afe3659bfb43ee6a06b5fb7b9d0649b5c4ed585d4ab94833c75afe8de16809b7c2a6f5be48ead51"' : 'data-bs-target="#xs-injectables-links-module-HelperModule-82f9c00bc81808bec5c15d7b7712b17de02697e32b1af7528afe3659bfb43ee6a06b5fb7b9d0649b5c4ed585d4ab94833c75afe8de16809b7c2a6f5be48ead51"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HelperModule-82f9c00bc81808bec5c15d7b7712b17de02697e32b1af7528afe3659bfb43ee6a06b5fb7b9d0649b5c4ed585d4ab94833c75afe8de16809b7c2a6f5be48ead51"' :
                                        'id="xs-injectables-links-module-HelperModule-82f9c00bc81808bec5c15d7b7712b17de02697e32b1af7528afe3659bfb43ee6a06b5fb7b9d0649b5c4ed585d4ab94833c75afe8de16809b7c2a6f5be48ead51"' }>
                                        <li class="link">
                                            <a href="injectables/CronService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CronService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/QQService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QQService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogModule.html" data-type="entity-link" >LogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LogModule-cf0c1bbd04968af31eb70938db4953f295da9de0002ad686728a248361efee70d10d94dd2f47c01fc5c58138fd8fe91bda863523672f0f88d97ce67cec784c25"' : 'data-bs-target="#xs-controllers-links-module-LogModule-cf0c1bbd04968af31eb70938db4953f295da9de0002ad686728a248361efee70d10d94dd2f47c01fc5c58138fd8fe91bda863523672f0f88d97ce67cec784c25"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LogModule-cf0c1bbd04968af31eb70938db4953f295da9de0002ad686728a248361efee70d10d94dd2f47c01fc5c58138fd8fe91bda863523672f0f88d97ce67cec784c25"' :
                                            'id="xs-controllers-links-module-LogModule-cf0c1bbd04968af31eb70938db4953f295da9de0002ad686728a248361efee70d10d94dd2f47c01fc5c58138fd8fe91bda863523672f0f88d97ce67cec784c25"' }>
                                            <li class="link">
                                                <a href="controllers/LogController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailerModule.html" data-type="entity-link" >MailerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailerModule-91229ba01fbf21fa980adce5076031b74a1d81601693989c483d8ad7b6b97ef045cc9d8708a7d2d088975e7e95cac81e22d2f063297829dc27df41dea102ce02"' : 'data-bs-target="#xs-injectables-links-module-MailerModule-91229ba01fbf21fa980adce5076031b74a1d81601693989c483d8ad7b6b97ef045cc9d8708a7d2d088975e7e95cac81e22d2f063297829dc27df41dea102ce02"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailerModule-91229ba01fbf21fa980adce5076031b74a1d81601693989c483d8ad7b6b97ef045cc9d8708a7d2d088975e7e95cac81e22d2f063297829dc27df41dea102ce02"' :
                                        'id="xs-injectables-links-module-MailerModule-91229ba01fbf21fa980adce5076031b74a1d81601693989c483d8ad7b6b97ef045cc9d8708a7d2d088975e7e95cac81e22d2f063297829dc27df41dea102ce02"' }>
                                        <li class="link">
                                            <a href="injectables/MailerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MenuModule.html" data-type="entity-link" >MenuModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MenuModule-f037f54e409771ca488b2ff2259e8bd7e510c9fe5da4a68643d3bfdf37f87f13a338433de281fe710d428ad9ac8ebceb33a91447c4e1b5b802f5392a0b751030"' : 'data-bs-target="#xs-controllers-links-module-MenuModule-f037f54e409771ca488b2ff2259e8bd7e510c9fe5da4a68643d3bfdf37f87f13a338433de281fe710d428ad9ac8ebceb33a91447c4e1b5b802f5392a0b751030"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MenuModule-f037f54e409771ca488b2ff2259e8bd7e510c9fe5da4a68643d3bfdf37f87f13a338433de281fe710d428ad9ac8ebceb33a91447c4e1b5b802f5392a0b751030"' :
                                            'id="xs-controllers-links-module-MenuModule-f037f54e409771ca488b2ff2259e8bd7e510c9fe5da4a68643d3bfdf37f87f13a338433de281fe710d428ad9ac8ebceb33a91447c4e1b5b802f5392a0b751030"' }>
                                            <li class="link">
                                                <a href="controllers/MenuController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NetdiskModule.html" data-type="entity-link" >NetdiskModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-NetdiskModule-066c0868e7b8f5923e425aced7f4ad01071072c65b58dc53dc280292b8b69ba253e4492065728101915da283f332a1c7f93164de1fa5746c022b62e65bda3b14"' : 'data-bs-target="#xs-controllers-links-module-NetdiskModule-066c0868e7b8f5923e425aced7f4ad01071072c65b58dc53dc280292b8b69ba253e4492065728101915da283f332a1c7f93164de1fa5746c022b62e65bda3b14"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NetdiskModule-066c0868e7b8f5923e425aced7f4ad01071072c65b58dc53dc280292b8b69ba253e4492065728101915da283f332a1c7f93164de1fa5746c022b62e65bda3b14"' :
                                            'id="xs-controllers-links-module-NetdiskModule-066c0868e7b8f5923e425aced7f4ad01071072c65b58dc53dc280292b8b69ba253e4492065728101915da283f332a1c7f93164de1fa5746c022b62e65bda3b14"' }>
                                            <li class="link">
                                                <a href="controllers/NetDiskManageController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NetDiskManageController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/NetDiskOverviewController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NetDiskOverviewController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NetdiskModule-066c0868e7b8f5923e425aced7f4ad01071072c65b58dc53dc280292b8b69ba253e4492065728101915da283f332a1c7f93164de1fa5746c022b62e65bda3b14"' : 'data-bs-target="#xs-injectables-links-module-NetdiskModule-066c0868e7b8f5923e425aced7f4ad01071072c65b58dc53dc280292b8b69ba253e4492065728101915da283f332a1c7f93164de1fa5746c022b62e65bda3b14"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NetdiskModule-066c0868e7b8f5923e425aced7f4ad01071072c65b58dc53dc280292b8b69ba253e4492065728101915da283f332a1c7f93164de1fa5746c022b62e65bda3b14"' :
                                        'id="xs-injectables-links-module-NetdiskModule-066c0868e7b8f5923e425aced7f4ad01071072c65b58dc53dc280292b8b69ba253e4492065728101915da283f332a1c7f93164de1fa5746c022b62e65bda3b14"' }>
                                        <li class="link">
                                            <a href="injectables/NetDiskManageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NetDiskManageService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NetDiskOverviewService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NetDiskOverviewService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OnlineModule.html" data-type="entity-link" >OnlineModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OnlineModule-8144a44a037a8c7a667b224c18d26c3ffcd27884dbb6b1e7b31ec722bf555598454cd65127354774bf3161056bfb30eb5f8393a0dbe752e08fd26f6bc9e4cdc4"' : 'data-bs-target="#xs-controllers-links-module-OnlineModule-8144a44a037a8c7a667b224c18d26c3ffcd27884dbb6b1e7b31ec722bf555598454cd65127354774bf3161056bfb30eb5f8393a0dbe752e08fd26f6bc9e4cdc4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OnlineModule-8144a44a037a8c7a667b224c18d26c3ffcd27884dbb6b1e7b31ec722bf555598454cd65127354774bf3161056bfb30eb5f8393a0dbe752e08fd26f6bc9e4cdc4"' :
                                            'id="xs-controllers-links-module-OnlineModule-8144a44a037a8c7a667b224c18d26c3ffcd27884dbb6b1e7b31ec722bf555598454cd65127354774bf3161056bfb30eb5f8393a0dbe752e08fd26f6bc9e4cdc4"' }>
                                            <li class="link">
                                                <a href="controllers/OnlineController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OnlineController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OnlineModule-8144a44a037a8c7a667b224c18d26c3ffcd27884dbb6b1e7b31ec722bf555598454cd65127354774bf3161056bfb30eb5f8393a0dbe752e08fd26f6bc9e4cdc4"' : 'data-bs-target="#xs-injectables-links-module-OnlineModule-8144a44a037a8c7a667b224c18d26c3ffcd27884dbb6b1e7b31ec722bf555598454cd65127354774bf3161056bfb30eb5f8393a0dbe752e08fd26f6bc9e4cdc4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OnlineModule-8144a44a037a8c7a667b224c18d26c3ffcd27884dbb6b1e7b31ec722bf555598454cd65127354774bf3161056bfb30eb5f8393a0dbe752e08fd26f6bc9e4cdc4"' :
                                        'id="xs-injectables-links-module-OnlineModule-8144a44a037a8c7a667b224c18d26c3ffcd27884dbb6b1e7b31ec722bf555598454cd65127354774bf3161056bfb30eb5f8393a0dbe752e08fd26f6bc9e4cdc4"' }>
                                        <li class="link">
                                            <a href="injectables/OnlineService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OnlineService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ParamConfigModule.html" data-type="entity-link" >ParamConfigModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ParamConfigModule-0b9da2aa82603ff9185c30a7b5cff66830dfdae035ef85fa8289dd4ff51da601847a785e825b58ca5598bdbefe3b8a00cd3e05dcef804098c009d050050a2ac2"' : 'data-bs-target="#xs-controllers-links-module-ParamConfigModule-0b9da2aa82603ff9185c30a7b5cff66830dfdae035ef85fa8289dd4ff51da601847a785e825b58ca5598bdbefe3b8a00cd3e05dcef804098c009d050050a2ac2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ParamConfigModule-0b9da2aa82603ff9185c30a7b5cff66830dfdae035ef85fa8289dd4ff51da601847a785e825b58ca5598bdbefe3b8a00cd3e05dcef804098c009d050050a2ac2"' :
                                            'id="xs-controllers-links-module-ParamConfigModule-0b9da2aa82603ff9185c30a7b5cff66830dfdae035ef85fa8289dd4ff51da601847a785e825b58ca5598bdbefe3b8a00cd3e05dcef804098c009d050050a2ac2"' }>
                                            <li class="link">
                                                <a href="controllers/ParamConfigController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParamConfigController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ParamConfigModule-0b9da2aa82603ff9185c30a7b5cff66830dfdae035ef85fa8289dd4ff51da601847a785e825b58ca5598bdbefe3b8a00cd3e05dcef804098c009d050050a2ac2"' : 'data-bs-target="#xs-injectables-links-module-ParamConfigModule-0b9da2aa82603ff9185c30a7b5cff66830dfdae035ef85fa8289dd4ff51da601847a785e825b58ca5598bdbefe3b8a00cd3e05dcef804098c009d050050a2ac2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ParamConfigModule-0b9da2aa82603ff9185c30a7b5cff66830dfdae035ef85fa8289dd4ff51da601847a785e825b58ca5598bdbefe3b8a00cd3e05dcef804098c009d050050a2ac2"' :
                                        'id="xs-injectables-links-module-ParamConfigModule-0b9da2aa82603ff9185c30a7b5cff66830dfdae035ef85fa8289dd4ff51da601847a785e825b58ca5598bdbefe3b8a00cd3e05dcef804098c009d050050a2ac2"' }>
                                        <li class="link">
                                            <a href="injectables/TodoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RedisModule-70d82eb4013d3bd4b77b8720dda1ed9888b00d9cfeda328012c666254a19ebe1f7d27111f45e54d3d38c22eafb05e6d286884063c9fe2f9fa0318c7d487d08ce"' : 'data-bs-target="#xs-injectables-links-module-RedisModule-70d82eb4013d3bd4b77b8720dda1ed9888b00d9cfeda328012c666254a19ebe1f7d27111f45e54d3d38c22eafb05e6d286884063c9fe2f9fa0318c7d487d08ce"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisModule-70d82eb4013d3bd4b77b8720dda1ed9888b00d9cfeda328012c666254a19ebe1f7d27111f45e54d3d38c22eafb05e6d286884063c9fe2f9fa0318c7d487d08ce"' :
                                        'id="xs-injectables-links-module-RedisModule-70d82eb4013d3bd4b77b8720dda1ed9888b00d9cfeda328012c666254a19ebe1f7d27111f45e54d3d38c22eafb05e6d286884063c9fe2f9fa0318c7d487d08ce"' }>
                                        <li class="link">
                                            <a href="injectables/CacheService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CacheService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RedisPubSubService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisPubSubService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoleModule.html" data-type="entity-link" >RoleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RoleModule-a6d6153116ab9ccbbf94c679105350f17e285959826b003e6f3118f454cee40fb35232200a07b5f642b66f6de635ff919fec0e8dfad3ec747e2a936989e7a0e4"' : 'data-bs-target="#xs-controllers-links-module-RoleModule-a6d6153116ab9ccbbf94c679105350f17e285959826b003e6f3118f454cee40fb35232200a07b5f642b66f6de635ff919fec0e8dfad3ec747e2a936989e7a0e4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoleModule-a6d6153116ab9ccbbf94c679105350f17e285959826b003e6f3118f454cee40fb35232200a07b5f642b66f6de635ff919fec0e8dfad3ec747e2a936989e7a0e4"' :
                                            'id="xs-controllers-links-module-RoleModule-a6d6153116ab9ccbbf94c679105350f17e285959826b003e6f3118f454cee40fb35232200a07b5f642b66f6de635ff919fec0e8dfad3ec747e2a936989e7a0e4"' }>
                                            <li class="link">
                                                <a href="controllers/RoleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServeModule.html" data-type="entity-link" >ServeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ServeModule-9771efc3d8976f9255aa60b8a1b3f939a99c0d450df8d11f0b7c749013dbc8fde65f607407359b9bda080ae312f289b4481fd0069d18df94fb9791eb43ef4ae2"' : 'data-bs-target="#xs-controllers-links-module-ServeModule-9771efc3d8976f9255aa60b8a1b3f939a99c0d450df8d11f0b7c749013dbc8fde65f607407359b9bda080ae312f289b4481fd0069d18df94fb9791eb43ef4ae2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServeModule-9771efc3d8976f9255aa60b8a1b3f939a99c0d450df8d11f0b7c749013dbc8fde65f607407359b9bda080ae312f289b4481fd0069d18df94fb9791eb43ef4ae2"' :
                                            'id="xs-controllers-links-module-ServeModule-9771efc3d8976f9255aa60b8a1b3f939a99c0d450df8d11f0b7c749013dbc8fde65f607407359b9bda080ae312f289b4481fd0069d18df94fb9791eb43ef4ae2"' }>
                                            <li class="link">
                                                <a href="controllers/ServeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServeController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SocketModule.html" data-type="entity-link" >SocketModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SseModule.html" data-type="entity-link" >SseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SseModule-a5c0170284f6628d68c48cf518e2743f750ef7ca391a54e5c7a0bb2117481ac85da91d8107a2d95fcab906aca6ee53d113e032d4907417610bda72d7ba41cb09"' : 'data-bs-target="#xs-controllers-links-module-SseModule-a5c0170284f6628d68c48cf518e2743f750ef7ca391a54e5c7a0bb2117481ac85da91d8107a2d95fcab906aca6ee53d113e032d4907417610bda72d7ba41cb09"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SseModule-a5c0170284f6628d68c48cf518e2743f750ef7ca391a54e5c7a0bb2117481ac85da91d8107a2d95fcab906aca6ee53d113e032d4907417610bda72d7ba41cb09"' :
                                            'id="xs-controllers-links-module-SseModule-a5c0170284f6628d68c48cf518e2743f750ef7ca391a54e5c7a0bb2117481ac85da91d8107a2d95fcab906aca6ee53d113e032d4907417610bda72d7ba41cb09"' }>
                                            <li class="link">
                                                <a href="controllers/SseController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SseController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SseModule-a5c0170284f6628d68c48cf518e2743f750ef7ca391a54e5c7a0bb2117481ac85da91d8107a2d95fcab906aca6ee53d113e032d4907417610bda72d7ba41cb09"' : 'data-bs-target="#xs-injectables-links-module-SseModule-a5c0170284f6628d68c48cf518e2743f750ef7ca391a54e5c7a0bb2117481ac85da91d8107a2d95fcab906aca6ee53d113e032d4907417610bda72d7ba41cb09"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SseModule-a5c0170284f6628d68c48cf518e2743f750ef7ca391a54e5c7a0bb2117481ac85da91d8107a2d95fcab906aca6ee53d113e032d4907417610bda72d7ba41cb09"' :
                                        'id="xs-injectables-links-module-SseModule-a5c0170284f6628d68c48cf518e2743f750ef7ca391a54e5c7a0bb2117481ac85da91d8107a2d95fcab906aca6ee53d113e032d4907417610bda72d7ba41cb09"' }>
                                        <li class="link">
                                            <a href="injectables/SseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StorageModule.html" data-type="entity-link" >StorageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-StorageModule-607477e5c2694341ded0bb29c0c3d7c57479b3e266af2ad14ce40215da9877e41cea3707dd23c32d79ea6ea7b5e8af369aa5da225fb8064cbc164fd6b1bfb40c"' : 'data-bs-target="#xs-controllers-links-module-StorageModule-607477e5c2694341ded0bb29c0c3d7c57479b3e266af2ad14ce40215da9877e41cea3707dd23c32d79ea6ea7b5e8af369aa5da225fb8064cbc164fd6b1bfb40c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StorageModule-607477e5c2694341ded0bb29c0c3d7c57479b3e266af2ad14ce40215da9877e41cea3707dd23c32d79ea6ea7b5e8af369aa5da225fb8064cbc164fd6b1bfb40c"' :
                                            'id="xs-controllers-links-module-StorageModule-607477e5c2694341ded0bb29c0c3d7c57479b3e266af2ad14ce40215da9877e41cea3707dd23c32d79ea6ea7b5e8af369aa5da225fb8064cbc164fd6b1bfb40c"' }>
                                            <li class="link">
                                                <a href="controllers/StorageController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StorageController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StorageModule-607477e5c2694341ded0bb29c0c3d7c57479b3e266af2ad14ce40215da9877e41cea3707dd23c32d79ea6ea7b5e8af369aa5da225fb8064cbc164fd6b1bfb40c"' : 'data-bs-target="#xs-injectables-links-module-StorageModule-607477e5c2694341ded0bb29c0c3d7c57479b3e266af2ad14ce40215da9877e41cea3707dd23c32d79ea6ea7b5e8af369aa5da225fb8064cbc164fd6b1bfb40c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StorageModule-607477e5c2694341ded0bb29c0c3d7c57479b3e266af2ad14ce40215da9877e41cea3707dd23c32d79ea6ea7b5e8af369aa5da225fb8064cbc164fd6b1bfb40c"' :
                                        'id="xs-injectables-links-module-StorageModule-607477e5c2694341ded0bb29c0c3d7c57479b3e266af2ad14ce40215da9877e41cea3707dd23c32d79ea6ea7b5e8af369aa5da225fb8064cbc164fd6b1bfb40c"' }>
                                        <li class="link">
                                            <a href="injectables/TodoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SystemModule.html" data-type="entity-link" >SystemModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TaskModule.html" data-type="entity-link" >TaskModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TaskModule-97780df06f21d4790d89aabe4ded9a15c25f7cb17105a67ad2d2c69a5c00a2cbbf43a7c995522a7305f1305903f0fe07e9f3dc3308202adf2c547314d9e1756a"' : 'data-bs-target="#xs-controllers-links-module-TaskModule-97780df06f21d4790d89aabe4ded9a15c25f7cb17105a67ad2d2c69a5c00a2cbbf43a7c995522a7305f1305903f0fe07e9f3dc3308202adf2c547314d9e1756a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TaskModule-97780df06f21d4790d89aabe4ded9a15c25f7cb17105a67ad2d2c69a5c00a2cbbf43a7c995522a7305f1305903f0fe07e9f3dc3308202adf2c547314d9e1756a"' :
                                            'id="xs-controllers-links-module-TaskModule-97780df06f21d4790d89aabe4ded9a15c25f7cb17105a67ad2d2c69a5c00a2cbbf43a7c995522a7305f1305903f0fe07e9f3dc3308202adf2c547314d9e1756a"' }>
                                            <li class="link">
                                                <a href="controllers/TaskController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link" >TasksModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TodoModule.html" data-type="entity-link" >TodoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TodoModule-febb44c3befb5643e7a03205950b2384916795a427e82cc338c91c9d3f406c5e1301cef31e713b30ab892d5f460f009a4b24b50f6e8b7e30b621c39f343517ee"' : 'data-bs-target="#xs-controllers-links-module-TodoModule-febb44c3befb5643e7a03205950b2384916795a427e82cc338c91c9d3f406c5e1301cef31e713b30ab892d5f460f009a4b24b50f6e8b7e30b621c39f343517ee"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TodoModule-febb44c3befb5643e7a03205950b2384916795a427e82cc338c91c9d3f406c5e1301cef31e713b30ab892d5f460f009a4b24b50f6e8b7e30b621c39f343517ee"' :
                                            'id="xs-controllers-links-module-TodoModule-febb44c3befb5643e7a03205950b2384916795a427e82cc338c91c9d3f406c5e1301cef31e713b30ab892d5f460f009a4b24b50f6e8b7e30b621c39f343517ee"' }>
                                            <li class="link">
                                                <a href="controllers/TodoController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TodoModule-febb44c3befb5643e7a03205950b2384916795a427e82cc338c91c9d3f406c5e1301cef31e713b30ab892d5f460f009a4b24b50f6e8b7e30b621c39f343517ee"' : 'data-bs-target="#xs-injectables-links-module-TodoModule-febb44c3befb5643e7a03205950b2384916795a427e82cc338c91c9d3f406c5e1301cef31e713b30ab892d5f460f009a4b24b50f6e8b7e30b621c39f343517ee"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TodoModule-febb44c3befb5643e7a03205950b2384916795a427e82cc338c91c9d3f406c5e1301cef31e713b30ab892d5f460f009a4b24b50f6e8b7e30b621c39f343517ee"' :
                                        'id="xs-injectables-links-module-TodoModule-febb44c3befb5643e7a03205950b2384916795a427e82cc338c91c9d3f406c5e1301cef31e713b30ab892d5f460f009a4b24b50f6e8b7e30b621c39f343517ee"' }>
                                        <li class="link">
                                            <a href="injectables/TodoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ToolsModule.html" data-type="entity-link" >ToolsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UploadModule.html" data-type="entity-link" >UploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UploadModule-abedcde5ffdc3ad16103817496b1ec8d775cc8ca7dda107305e69ffd026865a97bae63980bd21d096dc4e27145b8ed7c3427da279327f9d8fbca816b89742e7e"' : 'data-bs-target="#xs-controllers-links-module-UploadModule-abedcde5ffdc3ad16103817496b1ec8d775cc8ca7dda107305e69ffd026865a97bae63980bd21d096dc4e27145b8ed7c3427da279327f9d8fbca816b89742e7e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UploadModule-abedcde5ffdc3ad16103817496b1ec8d775cc8ca7dda107305e69ffd026865a97bae63980bd21d096dc4e27145b8ed7c3427da279327f9d8fbca816b89742e7e"' :
                                            'id="xs-controllers-links-module-UploadModule-abedcde5ffdc3ad16103817496b1ec8d775cc8ca7dda107305e69ffd026865a97bae63980bd21d096dc4e27145b8ed7c3427da279327f9d8fbca816b89742e7e"' }>
                                            <li class="link">
                                                <a href="controllers/UploadController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UploadModule-abedcde5ffdc3ad16103817496b1ec8d775cc8ca7dda107305e69ffd026865a97bae63980bd21d096dc4e27145b8ed7c3427da279327f9d8fbca816b89742e7e"' : 'data-bs-target="#xs-injectables-links-module-UploadModule-abedcde5ffdc3ad16103817496b1ec8d775cc8ca7dda107305e69ffd026865a97bae63980bd21d096dc4e27145b8ed7c3427da279327f9d8fbca816b89742e7e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadModule-abedcde5ffdc3ad16103817496b1ec8d775cc8ca7dda107305e69ffd026865a97bae63980bd21d096dc4e27145b8ed7c3427da279327f9d8fbca816b89742e7e"' :
                                        'id="xs-injectables-links-module-UploadModule-abedcde5ffdc3ad16103817496b1ec8d775cc8ca7dda107305e69ffd026865a97bae63980bd21d096dc4e27145b8ed7c3427da279327f9d8fbca816b89742e7e"' }>
                                        <li class="link">
                                            <a href="injectables/TodoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-74259101be61dd182c8d4f039060afa3baf6a484370b813bbe81110cad177649a248f4c4ad0fc0969d62a529a32557027fed0f9ad75ecb96e80f8fd67e8b60d8"' : 'data-bs-target="#xs-controllers-links-module-UserModule-74259101be61dd182c8d4f039060afa3baf6a484370b813bbe81110cad177649a248f4c4ad0fc0969d62a529a32557027fed0f9ad75ecb96e80f8fd67e8b60d8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-74259101be61dd182c8d4f039060afa3baf6a484370b813bbe81110cad177649a248f4c4ad0fc0969d62a529a32557027fed0f9ad75ecb96e80f8fd67e8b60d8"' :
                                            'id="xs-controllers-links-module-UserModule-74259101be61dd182c8d4f039060afa3baf6a484370b813bbe81110cad177649a248f4c4ad0fc0969d62a529a32557027fed0f9ad75ecb96e80f8fd67e8b60d8"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AccountController.html" data-type="entity-link" >AccountController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CaptchaController.html" data-type="entity-link" >CaptchaController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DeptController.html" data-type="entity-link" >DeptController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DictItemController.html" data-type="entity-link" >DictItemController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DictTypeController.html" data-type="entity-link" >DictTypeController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmailController.html" data-type="entity-link" >EmailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmailController-1.html" data-type="entity-link" >EmailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LogController.html" data-type="entity-link" >LogController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MenuController.html" data-type="entity-link" >MenuController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NetDiskManageController.html" data-type="entity-link" >NetDiskManageController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NetDiskOverviewController.html" data-type="entity-link" >NetDiskOverviewController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OnlineController.html" data-type="entity-link" >OnlineController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ParamConfigController.html" data-type="entity-link" >ParamConfigController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RoleController.html" data-type="entity-link" >RoleController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ServeController.html" data-type="entity-link" >ServeController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SseController.html" data-type="entity-link" >SseController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/StorageController.html" data-type="entity-link" >StorageController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TaskController.html" data-type="entity-link" >TaskController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TodoController.html" data-type="entity-link" >TodoController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UploadController.html" data-type="entity-link" >UploadController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/AccessTokenEntity.html" data-type="entity-link" >AccessTokenEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/CaptchaLogEntity.html" data-type="entity-link" >CaptchaLogEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DeptEntity.html" data-type="entity-link" >DeptEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DictItemEntity.html" data-type="entity-link" >DictItemEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DictTypeEntity.html" data-type="entity-link" >DictTypeEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/LoginLogEntity.html" data-type="entity-link" >LoginLogEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/MenuEntity.html" data-type="entity-link" >MenuEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ParamConfigEntity.html" data-type="entity-link" >ParamConfigEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RefreshTokenEntity.html" data-type="entity-link" >RefreshTokenEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RoleEntity.html" data-type="entity-link" >RoleEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Storage.html" data-type="entity-link" >Storage</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TaskEntity.html" data-type="entity-link" >TaskEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TaskLogEntity.html" data-type="entity-link" >TaskLogEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TodoEntity.html" data-type="entity-link" >TodoEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserEntity.html" data-type="entity-link" >UserEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AccountInfo.html" data-type="entity-link" >AccountInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountMenus.html" data-type="entity-link" >AccountMenus</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountUpdateDto.html" data-type="entity-link" >AccountUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdminEventsGateway.html" data-type="entity-link" >AdminEventsGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseGateway.html" data-type="entity-link" >BaseGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseService.html" data-type="entity-link" >BaseService</a>
                            </li>
                            <li class="link">
                                <a href="classes/BatchDeleteDto.html" data-type="entity-link" >BatchDeleteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BroadcastBaseGateway.html" data-type="entity-link" >BroadcastBaseGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/BusinessException.html" data-type="entity-link" >BusinessException</a>
                            </li>
                            <li class="link">
                                <a href="classes/CannotFindException.html" data-type="entity-link" >CannotFindException</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaptchaLogQueryDto.html" data-type="entity-link" >CaptchaLogQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CheckCodeDto.html" data-type="entity-link" >CheckCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommonEntity.html" data-type="entity-link" >CommonEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CompleteEntity.html" data-type="entity-link" >CompleteEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CoreLoad.html" data-type="entity-link" >CoreLoad</a>
                            </li>
                            <li class="link">
                                <a href="classes/CountInfo.html" data-type="entity-link" >CountInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cpu.html" data-type="entity-link" >Cpu</a>
                            </li>
                            <li class="link">
                                <a href="classes/CursorDto.html" data-type="entity-link" >CursorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteDto.html" data-type="entity-link" >DeleteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeptDto.html" data-type="entity-link" >DeptDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeptEntity.html" data-type="entity-link" >DeptEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeptQueryDto.html" data-type="entity-link" >DeptQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DictItemDto.html" data-type="entity-link" >DictItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DictItemQueryDto.html" data-type="entity-link" >DictItemQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DictTypeDto.html" data-type="entity-link" >DictTypeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DictTypeQueryDto.html" data-type="entity-link" >DictTypeQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Disk.html" data-type="entity-link" >Disk</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailSendDto.html" data-type="entity-link" >EmailSendDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileConstraint.html" data-type="entity-link" >FileConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileInfoDto.html" data-type="entity-link" >FileInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileOpDto.html" data-type="entity-link" >FileOpDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileOpItem.html" data-type="entity-link" >FileOpItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileUploadDto.html" data-type="entity-link" >FileUploadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FlowInfo.html" data-type="entity-link" >FlowInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetFileListDto.html" data-type="entity-link" >GetFileListDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HitInfo.html" data-type="entity-link" >HitInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdDto.html" data-type="entity-link" >IdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageCaptcha.html" data-type="entity-link" >ImageCaptcha</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageCaptchaDto.html" data-type="entity-link" >ImageCaptchaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitData1707996695540.html" data-type="entity-link" >InitData1707996695540</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsCronExpression.html" data-type="entity-link" >IsCronExpression</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsLegalNameExpression.html" data-type="entity-link" >IsLegalNameExpression</a>
                            </li>
                            <li class="link">
                                <a href="classes/KickDto.html" data-type="entity-link" >KickDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginLogInfo.html" data-type="entity-link" >LoginLogInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginLogQueryDto.html" data-type="entity-link" >LoginLogQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginToken.html" data-type="entity-link" >LoginToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/MarkFileDto.html" data-type="entity-link" >MarkFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Memory.html" data-type="entity-link" >Memory</a>
                            </li>
                            <li class="link">
                                <a href="classes/MenuDto.html" data-type="entity-link" >MenuDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MenuItemInfo.html" data-type="entity-link" >MenuItemInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/MenuMeta.html" data-type="entity-link" >MenuMeta</a>
                            </li>
                            <li class="link">
                                <a href="classes/MenuQueryDto.html" data-type="entity-link" >MenuQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MenuUpdateDto.html" data-type="entity-link" >MenuUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MKDirDto.html" data-type="entity-link" >MKDirDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoveDept.html" data-type="entity-link" >MoveDept</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoveDeptDto.html" data-type="entity-link" >MoveDeptDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OnlineQueryDto.html" data-type="entity-link" >OnlineQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OnlineUserInfo.html" data-type="entity-link" >OnlineUserInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/OperatorDto.html" data-type="entity-link" >OperatorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OverviewSpaceInfo.html" data-type="entity-link" >OverviewSpaceInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/PagerDto.html" data-type="entity-link" >PagerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Pagination.html" data-type="entity-link" >Pagination</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParamConfigDto.html" data-type="entity-link" >ParamConfigDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParamConfigQueryDto.html" data-type="entity-link" >ParamConfigQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordUpdateDto.html" data-type="entity-link" >PasswordUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RedisIoAdapter.html" data-type="entity-link" >RedisIoAdapter</a>
                            </li>
                            <li class="link">
                                <a href="classes/RedisSubPub.html" data-type="entity-link" >RedisSubPub</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RenameDto.html" data-type="entity-link" >RenameDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPasswordDto.html" data-type="entity-link" >ResetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResOp.html" data-type="entity-link" >ResOp</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleDto.html" data-type="entity-link" >RoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleInfo.html" data-type="entity-link" >RoleInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleQueryDto.html" data-type="entity-link" >RoleQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleUpdateDto.html" data-type="entity-link" >RoleUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Runtime.html" data-type="entity-link" >Runtime</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendEmailCodeDto.html" data-type="entity-link" >SendEmailCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendSmsCodeDto.html" data-type="entity-link" >SendSmsCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServeStatInfo.html" data-type="entity-link" >ServeStatInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/SFileInfo.html" data-type="entity-link" >SFileInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/SFileInfoDetail.html" data-type="entity-link" >SFileInfoDetail</a>
                            </li>
                            <li class="link">
                                <a href="classes/SFileList.html" data-type="entity-link" >SFileList</a>
                            </li>
                            <li class="link">
                                <a href="classes/SocketException.html" data-type="entity-link" >SocketException</a>
                            </li>
                            <li class="link">
                                <a href="classes/SpaceInfo.html" data-type="entity-link" >SpaceInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/StorageCreateDto.html" data-type="entity-link" >StorageCreateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/StorageDeleteDto.html" data-type="entity-link" >StorageDeleteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/StorageInfo.html" data-type="entity-link" >StorageInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/StoragePageDto.html" data-type="entity-link" >StoragePageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskConsumer.html" data-type="entity-link" >TaskConsumer</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskDto.html" data-type="entity-link" >TaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskLogInfo.html" data-type="entity-link" >TaskLogInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskLogQueryDto.html" data-type="entity-link" >TaskLogQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskQueryDto.html" data-type="entity-link" >TaskQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskUpdateDto.html" data-type="entity-link" >TaskUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TenantRoleUnique1730000000002.html" data-type="entity-link" >TenantRoleUnique1730000000002</a>
                            </li>
                            <li class="link">
                                <a href="classes/TodoDto.html" data-type="entity-link" >TodoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TodoQueryDto.html" data-type="entity-link" >TodoQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TodoUpdateDto.html" data-type="entity-link" >TodoUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TransferDeptDto.html" data-type="entity-link" >TransferDeptDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TreeResult.html" data-type="entity-link" >TreeResult</a>
                            </li>
                            <li class="link">
                                <a href="classes/TypeORMLogger.html" data-type="entity-link" >TypeORMLogger</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTable2001717007831711.html" data-type="entity-link" >UpdateTable2001717007831711</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadToken.html" data-type="entity-link" >UploadToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserExistDto.html" data-type="entity-link" >UserExistDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserPasswordDto.html" data-type="entity-link" >UserPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserQueryDto.html" data-type="entity-link" >UserQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserUpdateDto.html" data-type="entity-link" >UserUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/WebEventsGateway.html" data-type="entity-link" >WebEventsGateway</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CacheService.html" data-type="entity-link" >CacheService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CaptchaLogService.html" data-type="entity-link" >CaptchaLogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CaptchaService.html" data-type="entity-link" >CaptchaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreatorPipe.html" data-type="entity-link" >CreatorPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CronService.html" data-type="entity-link" >CronService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeptService.html" data-type="entity-link" >DeptService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DictItemService.html" data-type="entity-link" >DictItemService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DictTypeService.html" data-type="entity-link" >DictTypeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailJob.html" data-type="entity-link" >EmailJob</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EntityExistConstraint.html" data-type="entity-link" >EntityExistConstraint</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpRequestJob.html" data-type="entity-link" >HttpRequestJob</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IdempotenceInterceptor.html" data-type="entity-link" >IdempotenceInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalGuard.html" data-type="entity-link" >LocalGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogClearJob.html" data-type="entity-link" >LogClearJob</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link" >LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link" >LoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginLogService.html" data-type="entity-link" >LoginLogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailerService.html" data-type="entity-link" >MailerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenuService.html" data-type="entity-link" >MenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NetDiskManageService.html" data-type="entity-link" >NetDiskManageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NetDiskOverviewService.html" data-type="entity-link" >NetDiskOverviewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OnlineService.html" data-type="entity-link" >OnlineService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParamConfigService.html" data-type="entity-link" >ParamConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParseIntPipe.html" data-type="entity-link" >ParseIntPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QQService.html" data-type="entity-link" >QQService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RedisPubSubService.html" data-type="entity-link" >RedisPubSubService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleService.html" data-type="entity-link" >RoleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServeService.html" data-type="entity-link" >ServeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SseService.html" data-type="entity-link" >SseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link" >StorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskLogService.html" data-type="entity-link" >TaskLogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskService.html" data-type="entity-link" >TaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeoutInterceptor.html" data-type="entity-link" >TimeoutInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TodoService.html" data-type="entity-link" >TodoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UniqueConstraint.html" data-type="entity-link" >UniqueConstraint</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdaterPipe.html" data-type="entity-link" >UpdaterPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UploadService.html" data-type="entity-link" >UploadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RbacGuard.html" data-type="entity-link" >RbacGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ResourceGuard.html" data-type="entity-link" >ResourceGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AllConfigType.html" data-type="entity-link" >AllConfigType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthGatewayOptions.html" data-type="entity-link" >AuthGatewayOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Condition.html" data-type="entity-link" >Condition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Condition-1.html" data-type="entity-link" >Condition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExecuteData.html" data-type="entity-link" >ExecuteData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthGateway.html" data-type="entity-link" >IAuthGateway</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IdempotenceOption.html" data-type="entity-link" >IdempotenceOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INumberFieldOptions.html" data-type="entity-link" >INumberFieldOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOptionalOptions.html" data-type="entity-link" >IOptionalOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaginationLinks.html" data-type="entity-link" >IPaginationLinks</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaginationMeta.html" data-type="entity-link" >IPaginationMeta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaginationOptions.html" data-type="entity-link" >IPaginationOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStringFieldOptions.html" data-type="entity-link" >IStringFieldOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageEvent.html" data-type="entity-link" >MessageEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/myError.html" data-type="entity-link" >myError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestType.html" data-type="entity-link" >RequestType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResourceObject.html" data-type="entity-link" >ResourceObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouteRecordRaw.html" data-type="entity-link" >RouteRecordRaw</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});