<template>
    <div id="mission">
        <div id="title-row">
            <span>🗺️</span>
            <h2>Your Field Guide to the Digital World</h2>
            <span>💾</span>
        </div>
        <div id="list-row">
            <div>
                <h3>For Those New To Coding:</h3>
                <ul>
                    <li>
                        Learning basic programming gives you new ways to
                        <strong>be creative and establish a presence</strong> in
                        an increasingly digital world.
                    </li>
                    <li>
                        At our lessons, you can explore writing code without
                        devoting your life to learning computer logic.
                    </li>
                </ul>
            </div>
            <div>
                <h3>For Those Already Learning:</h3>
                <ul>
                    <li>
                        Classes teach abstract technical concepts; we show you
                        the <strong>modern tools and technologies</strong> used
                        by the industry in the real world.
                    </li>
                    <li>
                        Plus, we bring in alumni and representatives from real
                        companies to tell you what they think you should know.
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#mission {
    @include center;
    h3 {
        font-size: 3.5vh;
        @media (max-width: 1000px) {
            font-size: 3vh;
        }
    }
    line-height: 1.3;
    padding: 5vh 10px 7vh 10px;
    background-image: linear-gradient(to top left, #5c2370, #242d76);
}
#title-row {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4vh;
    width: 50vw;
    margin: 10px auto;
    h2 {
        width: max-content;
    }
    span {
        font-size: 7vh;
    }
    * {
        margin: 0 20px;
    }
    @media (max-width: 1000px) {
        margin: unset;
        width: 100%;
        font-size: 3vh;
        span {
            font-size: 4.5vh;
        }
        * {
            margin: 0 10px;
        }
    }
}
#list-row {
    width: 75vw;
    display: flex;
    margin: 20px auto;
    div {
        text-align: left;
        width: 45%;
        padding: 10px 30px;
        background-color: #0003;
        border-radius: 15px;
        margin: 20px;
        h3 {
            margin-top: 20px;
        }
        ul {
            padding-left: 0px;
            list-style-type: none;
        }
        li {
            font-size: 1.4em;
            margin: 30px 0;
            &:nth-child(2n) {
                font-size: 1.3em;
            }
        }
    }
    @media (max-width: 1000px) {
        flex-direction: column;
        width: 100%;
        div {
            width: unset;
            margin: 10px;
            padding: 20px 35px;
        }
    }
}
</style>
