const compModal=require("../model/compSchema");
const {cimsSchema}=require("../schema/cimsSchema");
//const {customResponse}=require("../utility/helper");
 const cimsGet = async(req, res)=>{
    // const {designation, brandname, clientname, domain, baselocation, companyaddress, contacts }=req.body

    try {
        const Comps = await compModal.find({});
        res.status(220).send(Comps);
        
    } catch (error) {
        res.status(402).send(error);
    }
};
//
 const cimsPost = async(req, res)=>{
 const {designation, brandname, clientname, domain, baselocation, addressLine1, addressLine2, pincode, country, state, district, city, landmark, contacts}=req.body
    console.log({designation, brandname, clientname, domain, baselocation, addressLine1, addressLine2, pincode, country, state, district, city, landmark, contacts })
    try {
        const{error}=cimsSchema.validate(req.body);
        console.log(error)
        if (error) {
      code = 422;
      message = "Invalid request data";
      
      return res.status(code).send(error);
    }
        const newComp = await compModal.create({designation, brandname, clientname, domain, baselocation, addressLine1, addressLine2, pincode, country, state, district, city, landmark, contacts })
        res.json(newComp)
        console.log("created successfully.." , newComp)
    } 
    catch (err) {
        console.log(err)
    }
};

 const cimsDel =async(req,res)=>{
    const {id}=req.params;
    try{
        const del=await compModal.findById(id);
        await del.remove();
        res.json("deleted successfully")
    }catch(error){
        res.status(500).send(error)
    }
};
//
 const cimsPatch =async(req,res) =>{
    const {id} =req.params;
    const {designation, brandname, clientname, domain, baselocation, addressLine1,pincode,country,state,district,city, contacts } = req.body;
    try{
        const update=await compModal.findOneAndUpdate(id, {designation, brandname, clientname, domain, baselocation, addressLine1,pincode,country,state,district,city, contacts });
        res.json(update)
    }
    catch(error){
        console.log(error.message)
    }
};

module.exports={cimsDel,cimsGet,cimsPatch,cimsPost};
