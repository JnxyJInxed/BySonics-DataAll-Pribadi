const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
//Deklarasi Model
const dataSuhu = require('../models/Suhu_Model');

//DATA Suhu  
    //get all
    router.get('/All', async (req,res) => {
        try{
            const dataAll = await dataSuhu.find(); //ngasih semua data yang udah kesimpan
            res.json(dataAll);
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL Suhu'});
        }
    });
    //get Last
    router.get('/Lastest', async (req,res) => {
        try{
            const dataSuhu_Last = await dataSuhu.find().limit(1).sort({$natural:-1});
            res.json(dataSuhu_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by Suhu ID'});
        }
    });

    //get Last by ID
    router.get('/Lastest_Specific', async (req,res) => {
        try{
            const query = {
                id_pasien: req.body.id_pasien
            }
            console.log(req.body.id_pasien);
            const dataSuhu_Last = await dataSuhu.find(query).limit(1).sort({$natural:-1});
            res.json(dataSuhu_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by Suhu ID'});
        }
    });

    //get All by ID
    router.get('/All_Specific', async (req,res) => {
        try{
            const query = {
                id_pasien: req.body.id_pasien
            }
            console.log(req.body.id_pasien);
            const dataSuhu_Last = await dataSuhu.find(query);
            res.json(dataSuhu_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL Suhu by ID'});
        }
    });

    router.post('/save', async (req,res) => { //pake async kalau save CARA 2
        console.log(req.body) //cek Body
        const newData = new dataSuhu({ //masukin info dari body ke salam model database Post
                    id_rompi : req.body.id_rompi,
                    id_sensor : req.body.id_sensor, 
                    id_pasien : req.body.id_pasien,
                    dataSuhu : req.body.dataSuhu
        });
        // Save and validate
        newData.save()
        .then(newData=> {
            return res.status(200).json({
            message :'Data Suhu Berhasil Disimpan'
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({error:err.message});
    });

    });

module.exports = router;