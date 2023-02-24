const Business=require('../models/Business');

const GetBusiness=async (req, res) => {
    try {
      const business = await Business.findById(req.params.id);
      if (!business) {
        throw new Error("there is no business with given details");
      }
      res.status(200).json(business);
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  }
const EditBusiness=async (req, res) => {
    try {
      const business = await Business.findById(req.params.id);
      if (!business) {
        throw new Error("there is no business with given details");
      }
      await business.updateOne({
        $set: req.body,
      });
      res.status(200).json("updated succesfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  const DeleteBusiness=async(req,res)=>{
    try {
        await Business.findByIdAndDelete(req.params.id);
        res.status(200).json('deleted succesfully');

    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}
module.exports={getBusiness:GetBusiness, editBusiness:EditBusiness,deleteBusiness:DeleteBusiness}