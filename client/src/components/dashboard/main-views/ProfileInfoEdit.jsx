import { useState } from "react";

const styles = {
    profileBubble: `flex flex-col justify-center items-center w-[90%]
        py-3 rounded-[2rem] shadow-[inset_-1px_-1px_5px_1px] bg-white`,
    infoBubble: `text-center py-1 px-3 border border-black rounded-full shadow-[inset_-1px_-1px_3px]`,
    infoIcon: `fa-solid pr-2`,
};

const infoOptions = {
    zodiac: [
        { value: "capricorn", label: "Capricorn" },
        { value: "aquarius", label: "Aquarius" },
        { value: "pisces", label: "Pisces" },
        { value: "aries", label: "Aries" },
        { value: "taurus", label: "Taurus" },
        { value: "gemini", label: "Gemini" },
        { value: "cancer", label: "Cancer" },
        { value: "leo", label: "Leo" },
        { value: "virgo", label: "Virgo" },
        { value: "libra", label: "Libra" },
        { value: "scorpio", label: "Scorpio" },
        { value: "sagittarius", label: "Sagittarius" },
        { value: "empty", label: " " },
    ],
    school: [
        { value: "highSchool", label: "High School" },
        { value: "inCollege", label: "In College" },
        { value: "trade", label: "Trade School" },
        { value: "associates", label: "Associates" },
        { value: "bachelors", label: "Bachelors" },
        { value: "masters", label: "Masters" },
        { value: "phd", label: "PhD" },
        { value: "empty", label: " " },
    ],
    kids: [
        { value: "have", label: "Have kids" },
        { value: "dont", label: "Don't have kids" },
        { value: "empty", label: " " },
    ],
    familyPlans: [
        { value: "want", label: "Want kids" },
        { value: "dont", label: "Don't want kids" },
        { value: "open", label: "Open to kids" },
        { value: "notSure", label: "Not sure" },
        { value: "empty", label: " " },
    ],
    pets: [
        { value: "dog", label: "Dog" },
        { value: "cat", label: "Cat" },
        { value: "fish", label: "Fish" },
        { value: "bird", label: "Bird" },
        { value: "multiple", label: "Multiple" },
        { value: "none", label: "None" },
        { value: "allergic", label: "Allergic" },
        { value: "petFree", label: "Pet-free" },
        { value: "other", label: "Other" },
        { value: "empty", label: " " },
    ],
    drinking: [
        { value: "everyday", label: "Everyday" },
        { value: "often", label: "Often" },
        { value: "sometimes", label: "Sometimes" },
        { value: "never", label: "Never" },
        { value: "empty", label: " " },
    ],
    smoking: [
        { value: "everyday", label: "Everyday" },
        { value: "often", label: "Often" },
        { value: "sometimes", label: "Sometimes" },
        { value: "never", label: "Never" },
        { value: "empty", label: " " },
    ],
    workout: [
        { value: "everyday", label: "Everyday" },
        { value: "often", label: "Often" },
        { value: "sometimes", label: "Sometimes" },
        { value: "never", label: "Never" },
        { value: "empty", label: " " },
    ],
};

// Internal Components

const InputLine = ({labelFor, labelValue, align="text-left", type, name, placeholder="", min="", max="", value, onChange}) => {
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
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

const InfoButton = ({ selectName, selectDefault, infoOptionArray }) => {
    return (
        <select className="outline-none" name={selectName} id={selectName} defaultValue={selectDefault}>
            {infoOptionArray.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
};

// Main Component

const ProfileInfoEdit = ({
    userProfile,
    setIsUserEditing,
    setUserProfile,
}) => {
    const [unsavedProfile, setUnsavedProfile] = useState(userProfile);
    const [heightUnit, setHeightUnit] = useState("Imperial");

    const handleInputChange = (e) => {
        const { name, value} = e.target;
        let newProfile = { ...unsavedProfile, [name]: value};

        // Recalculate height values
        if (name === "heightft" || name === "heightin") {
            const feet = parseInt(newProfile.heightft || 0, 10);
            const inches = parseInt(newProfile.heightin || 0, 10);
            const totalInches = feet * 12 + inches;
            newProfile.heightcm = Math.round(totalInches * 2.54);
        } else if (name === "heightcm") {
            const totalInches = Math.round(parseInt(value || 0, 10) / 2.54);
            newProfile.heightft = Math.floor(totalInches / 12);
            newProfile.heightin = totalInches % 12;
        }

        setUnsavedProfile(newProfile);
    };

    const handleSaveProfile = () => {
        setUserProfile(prevProfile => {
            const updatedProfile = { ...prevProfile, ...unsavedProfile };
            localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
            window.dispatchEvent(new Event("profileUpdated"));
            return updatedProfile;
        });
        setIsUserEditing(false);
    };

    return (
        <>
        {/* Profile - Basics */}
        <div className={`${styles.profileBubble} relative`}>
            {/* Save Button */}
            <button
                className="absolute top-4 right-4 border border-black rounded-full p-2 bg-green-300"
                onClick={handleSaveProfile}
            >
                Save
            </button>
            {/* Name */}
            <InputLine
                labelFor="name"
                labelValue="Name"
                type="text"
                name="name"
                placeholder={userProfile.name}
                onChange={handleInputChange}
            />
            {/* Age */}
            <InputLine
                labelFor="age"
                labelValue="Age"
                align="text-center"
                type="number"
                name="age"
                placeholder={userProfile.age}
                min={18}
                max={130}
                onChange={handleInputChange}
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
                            placeholder={userProfile.heightft}
                            min={0}
                            max={8}
                            onChange={handleInputChange}
                        />
                        <p> ft </p>
                        <input
                            className="text-center rounded-lg bg-gray-100"
                            type="number"
                            name="heightin"
                            placeholder={userProfile.heightin}
                            min={0}
                            max={11}
                            onChange={handleInputChange}
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
                            placeholder={userProfile.heightcm}
                            min={1}
                            max={250}
                            onChange={handleInputChange}
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
                labelFor="jobTitle"
                labelValue="Job Title"
                type="text"
                name="jobTitle"
                placeholder={userProfile.jobTitle}
                onChange={handleInputChange}
            />
            {/* School */}
            <InputLine
                labelFor="school"
                labelValue="College"
                type="text"
                name="school"
                placeholder={userProfile.school}
                onChange={handleInputChange}
            />
        </div>
        {/* About Me */}
        <div className={`${styles.profileBubble}`}>
            <h2 className="font-semibold">About Me:</h2>
            <textarea
                className="w-[95%] mx-auto text-center rounded-lg bg-gray-100"
                name="about"
                id="about"
                placeholder={userProfile.about}
                onChange={handleInputChange}
            >
            </textarea>
        </div>
        {/* Optional Info */}
        <div className={`${styles.profileBubble}`}>
            <h2 className="font-semibold pb-2">Info:</h2>
            <div className="flex justify-center flex-wrap gap-2 w-[90%]">
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-scale-balanced`}></i>
                    <InfoButton
                        selectName={"zodiac"}
                        selectDefault={"libra"}
                        infoOptionArray={infoOptions.zodiac}
                        onChange={handleInputChange}
                    />
                </p>
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-graduation-cap`}></i>
                    <InfoButton
                        selectName={"school"}
                        selectDefault={"bachelors"}
                        infoOptionArray={infoOptions.school}
                        onChange={handleInputChange}
                    />
                </p>
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-children`}></i>
                    <InfoButton
                        selectName={"kids"}
                        selectDefault={"dont"}
                        infoOptionArray={infoOptions.kids}
                        onChange={handleInputChange}
                    />
                </p>
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-baby-carriage`}></i>
                    <InfoButton
                        selectName={"familyPlans"}
                        selectDefault={"want"}
                        infoOptionArray={infoOptions.familyPlans}
                        onChange={handleInputChange}
                    />
                </p>
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-paw`}></i>
                    <InfoButton
                        selectName={"pets"}
                        selectDefault={"cat"}
                        infoOptionArray={infoOptions.pets}
                        onChange={handleInputChange}
                    />
                </p>
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-martini-glass`}></i>
                    <InfoButton
                        selectName={"drinking"}
                        selectDefault={"sometimes"}
                        infoOptionArray={infoOptions.drinking}
                        onChange={handleInputChange}
                    />
                </p>
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-smoking`}></i>
                    <InfoButton
                        selectName={"smoking"}
                        selectDefault={"never"}
                        infoOptionArray={infoOptions.smoking}
                        onChange={handleInputChange}
                    />
                </p>
                <p className={`${styles.infoBubble}`}>
                    <i className={`${styles.infoIcon} fa-dumbbell`}></i>
                    <InfoButton
                        selectName={"workout"}
                        selectDefault={"often"}
                        infoOptionArray={infoOptions.workout}
                        onChange={handleInputChange}
                    />
                </p>
            </div>
        </div>
        </>
    )
};

export default ProfileInfoEdit