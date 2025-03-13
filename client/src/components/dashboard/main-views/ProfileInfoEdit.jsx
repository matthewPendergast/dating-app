import { useState } from "react";

const styles = {
    profileBubble: `flex flex-col justify-center items-center w-[90%]
        py-3 rounded-[2rem] shadow-[inset_-1px_-1px_5px_1px] bg-white`,
    infoBubble: `text-center py-1 px-3 border border-black rounded-full shadow-[inset_-1px_-1px_3px]`,
    infoIcon: `fa-solid pr-2`,
};

const InputLine = ({labelFor, labelValue, align="text-left", type, name, placeholder="", min="", max=""}) => {
    return (
        <div className="flex items-center gap-1 w-[85%] mx-auto overflow-hidden">
            <label
                className="w-1/2 font-semibold text-right"
                htmlFor={labelFor}>{labelValue}:</label>
            <input
                className={`${align} rounded-lg bg-gray-100`}
                type={type}
                name={name}
                placeholder={placeholder}
                min={min}
                max={max}
            />
        </div>
    );
};

const ProfileInfoEdit = ({
    selectedUser,
    SetIsUserEditing,
}) => {
    const [heightUnit, setHeightUnit] = useState("Imperial");

    return (
        <>
        {/* Profile - Basics */}
        <div className={`${styles.profileBubble} relative`}>
            {/* Save Button */}
            <button
                className="absolute top-4 right-4 border border-black rounded-full p-2 bg-green-300"
                onClick={() => SetIsUserEditing(false)}
            >
                Save
            </button>
            {/* Name */}
            <InputLine
                labelFor="name"
                labelValue="Name"
                type="text"
                name="text"
                placeholder="Elizabeth"
            />
            {/* Age */}
            <InputLine
                labelFor="age"
                labelValue="Age"
                align="text-center"
                type="number"
                name="age"
                placeholder="24"
                min={18}
                max={130}
            />
            {/* Height */}
            {heightUnit === "Imperial" ?
            (
                <div className="flex items-center gap-1 w-[85%] mx-auto overflow-hidden">
                    <label
                        className="font-semibold w-1/2 text-right"
                        htmlFor="heightft">
                        Height:
                    </label>
                    <div className="flex">
                        <input
                            className="text-center rounded-lg bg-gray-100"
                            type="number"
                            name="heightft"
                            placeholder={5}
                            min={0}
                            max={8}
                        />
                        <p> ft </p>
                        <input
                            className="text-center rounded-lg bg-gray-100"
                            type="number"
                            name="heightft"
                            placeholder={6}
                            min={0}
                            max={11}
                        />
                        <p> in</p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-1 w-[85%] mx-auto overflow-hidden">
                    <label
                        className="font-semibold w-1/2 text-right"
                        htmlFor="heightcm">
                        Height:
                    </label>
                    <div className="flex">
                        <input
                            className="text-center rounded-lg bg-gray-100"
                            type="number"
                            name="heightcm"
                            placeholder={168}
                            min={1}
                            max={250}
                        />
                        <p> cm</p>
                    </div>
                </div>
            )}
            <button
                className="border border-black rounded-full px-2 py-1 text-sm my-1 bg-green-300"
                onClick={() => setHeightUnit(prev => prev === "Imperial" ? "Metric" : "Imperial")}
            >
                {heightUnit}
            </button>
            {/* Employment */}
            <InputLine
                labelFor="job"
                labelValue="Job Title"
                type="text"
                name="job"
                placeholder="Behavior Analyst"
            />
            {/* School */}
            <InputLine
                labelFor="school"
                labelValue="College"
                type="text"
                name="school"
                placeholder="Local State University"
            />
        </div>
        {/* About Me */}
        <div className={`${styles.profileBubble}`}>
            <h2 className="font-semibold">About Me:</h2>
            <textarea
                className="w-[95%] mx-auto text-center rounded-lg bg-gray-100"
                name="about"
                id="about"
                placeholder={selectedUser?.about}>
            </textarea>
        </div>
        {/* Optional Info */}
        <div className={`${styles.profileBubble}`}>
            <h2 className="font-semibold pb-2">Info:</h2>
            <div className="flex justify-center flex-wrap gap-2 w-[90%]">
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-scale-balanced`}></i>
                    <select name="zodiac" id="zodiac">
                        <option value="capricorn">Capricorn</option>
                        <option value="aquarius">Aquarius</option>
                        <option value="pisces">Pisces</option>
                        <option value="aries">Aries</option>
                        <option value="taurus">Taurus</option>
                        <option value="gemini">Gemini</option>
                        <option value="cancer">Cancer</option>
                        <option value="leo">Leo</option>
                        <option value="virgo">Virgo</option>
                        <option value="libra">Libra</option>
                        <option value="scorpio">Scorpio</option>
                        <option value="sagittarius">Sagittarius</option>
                        <option value="empty">Leave blank</option>
                    </select>
                </p>
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-graduation-cap`}></i>
                    <select name="education" id="education">
                        <option value="highSchool">High School</option>
                        <option value="inCollege">In College</option>
                        <option value="associates">Associates</option>
                        <option value="bachelors">Bachelors</option>
                        <option value="masters">Masters</option>
                        <option value="phd">PhD</option>
                        <option value="trade">Trade School</option>
                        <option value="empty">Leave blank</option>
                    </select>
                </p>
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-baby-carriage`}></i>
                    <select name="children" id="children">
                        <option value="wantA">Want children</option>
                        <option value="wantB">Don't have but want</option>
                        <option value="haveA">Have children, want more</option>
                        <option value="haveB">Have children, don't want more</option>
                        <option value="no">Don't want children</option>
                        <option value="notSure">Not sure</option>
                        <option value="open">Open to children</option>
                        <option value="empty">Leave blank</option>
                    </select>
                </p>
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-paw`}></i>
                    <select name="pets" id="pets">
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="fish">Fish</option>
                        <option value="bird">Bird</option>
                        <option value="multiple">Multiple</option>
                        <option value="none">None</option>
                        <option value="allergic">Allergic</option>
                        <option value="petFree">Pet-free</option>
                        <option value="other">Other</option>
                        <option value="empty">Leave blank</option>
                    </select>
                </p>
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-martini-glass`}></i>
                    <select name="drinking" id="drinking">
                        <option value="everyday">Everyday</option>
                        <option value="often">Often</option>
                        <option value="sometimes">Sometimes</option>
                        <option value="never">Never</option>
                        <option value="empty">Leave blank</option>
                    </select>
                </p>
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-smoking`}></i>
                    <select name="smoking" id="smoking">
                        <option value="everyday">Everyday</option>
                        <option value="often">Often</option>
                        <option value="sometimes">Sometimes</option>
                        <option value="never">Never</option>
                        <option value="empty">Leave blank</option>
                    </select>
                </p>
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-dumbbell`}></i>
                    <select name="workout" id="workout">
                        <option value="everyday">Everyday</option>
                        <option value="often">Often</option>
                        <option value="sometimes">Sometimes</option>
                        <option value="never">Never</option>
                        <option value="empty">Leave blank</option>
                    </select>
                </p>
            </div>
        </div>
        </>
    )
};

export default ProfileInfoEdit