const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db) =>{
    //inserir dados

    proffyValue = { 
    name: "Natan Falconi",
    avatar:"https://www.shareicon.net/data/2016/08/05/806962_user_512x512.png",
    whatsapp:"27996638245", 
    bio:"Entusiata das melhores tecnologias de Química Avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    }

    classValue = {
    subject:"1", 
    cost:"20",
   // o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados após cadastramos a  class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0, 
            time_from: 520, 
            time_to: 1220
        }
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //consultar os dados  inseridos

    //todos os proffys
    const selectedProffys = await db.all ("SELECT * FROM proffys")
    // console.log(selectedProffys)

    //consultar as classes de um determinado professor e trazer junto todos os seus dados

    const selectClassesAndProffys = await db.all(` 
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo, é das 8 as 18
    // o horário do time_from (8h) precisa ser antes ou igual ao horário solicitado
    // o time_to precisa ser acima 

    const selectClassesSchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)

    // console.log(selectClassesSchedule)

})