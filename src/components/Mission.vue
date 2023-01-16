<template>
    <div id="mission">
        <h2>🗺️ Your Field Guide to the Digital World 💾</h2>
        <div id="list-row">
            <div>
                <h3>For Those Familiar With Coding</h3>
                <ul>
                    <li>
                        Classes give you an background in technical concepts; we
                        show you <strong>the technologies at work in people's
                        lives.</strong>
                    </li>
                    <li>
                        While CS classes teach you the botanical science of the
                        digital world, we show you where and how to plant new
                        trees 🦾🌳.
                    </li>
                    <li>
                        We explain the modern languages and libraries that the
                        tech industry uses to accomplish what it accomplishes.
                    </li>
                    <li>
                        Plus, we bring in alumni and representatives from real
                        companies to tell you what they think you should know.
                    </li>
                </ul>
            </div>
            <div>
                <h3>For Those New to Coding</h3>
                <ul>
                    <li>
                        We are all <strong>increasingly online</strong>.
                    </li>
                    <li>
                        As the digital world progressively encroaches on the
                        physical one, you probably want to figure out how it
                        works.
                    </li>
                    <li>
                        But more than that - learning basic programming
                        techniques opens the door to real creativity and a more
                        interesting relationship with interactive technologies.
                    </li>
                    <li>
                        We can help you learn how to code without devoting your
                        life to understanding the logic of a computer.
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#mission {
    @include center;
    h2 {
        font-size: 5vh;
    }
    h3 {
        font-size: 3.5vh;
    }
    li {
        font-size: 1.4em;
        margin: 20px 0;
        &:nth-child(2n) {
            font-size: 1.15em;
            margin-left: 20px;
        }
    }
    line-height: 1.3;
    padding-top: 5vh;
    padding-bottom: 7vh;
    min-height: 70vh;
    background-image: linear-gradient(to top left, #5c2370, #242d76);
}
#list-row {
    display: flex;
    width: 80vw;
    margin: 0 auto;
    flex-direction: row;
    div {
        text-align: left;
        width: 100%;
        padding: 0 35px;
    }
    @media (max-width: 800px) {
        flex-direction: column;
        div {
            &:not(:last-child) {
                margin-right: unset;
        }
        }
    }
}
</style>
