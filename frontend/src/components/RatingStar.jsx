const RatingStar=({value,setValue})=>{
    return(
        <div className="rating-star">
            {[1,2,3,4,5].map(item=>(
                <span key={item} onClick={()=>setValue(item)} className={value>=item?"active":""}>
★
</span>
            ))}
        </div>
    );
};
export default RatingStar;
