<template>
    <div id="mission">
        <h2>🗺️ Your Field Guide to the Digital World 💾</h2>
        <div id="list-row">
            <div>
                <h3>For Those New To Coding:</h3>
                <ul>
                    <li>
                        Learning basic programming gives you new ways to be
                        creative and establish a presence in an increasingly
                        digital world.
                    </li>
                    <li>
                        At our lessons, you can explore writing code without
                        devoting your life to computers' logic.
                    </li>
                </ul>
            </div>
            <div>
                <h3>For Those Already Learning:</h3>
                <ul>
                    <li>
                        Classes teach abstract technical concepts; we show you
                        the modern tools and technologies used by the industry
                        in the real world.
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
