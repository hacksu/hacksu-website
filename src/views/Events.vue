<template>
    <div class="container">
        <h1 style="margin: auto">2023/2024 Tentative Schedule</h1>
        <br>
        <v-data-table id="table">
            <thead>
                <tr>
                    <th v-for="col in columns" v-bind:key = "col">{{col}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" v-bind:key = "row">
                     <td v-for="col in columns" v-bind:key = "col">
                         <a v-if="row.link && row[col][1] == 't'" .href = "row[col]">{{row[col]}}</a>
                         <p v-else>{{row[col]}}</p>
                     </td>
                </tr>
            </tbody>
        </v-data-table>
    </div>
</template>
<script src="../events.js"></script>
<style scoped>
    v-data-table{
        margin: auto;
        color: black;
        border: none;
        border-color: black;
    }
    /* tbody tr:nth-child(odd) {
        background-color: #35c982;
    }

    tbody tr:nth-child(even) {
        background-color: #4683FF;
    } */
    .container{
        background: linear-gradient(to top left, #35c982, #4683FF);
        min-height: 100vh;
        padding: 100px;
        overflow: auto;
    }
</style>
