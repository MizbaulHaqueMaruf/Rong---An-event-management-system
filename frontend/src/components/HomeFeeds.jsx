/* eslint-disable react/prop-types */
const HomeFeeds = () => {
    const events = [
        {
            id: 1,
            title: "3rd National Science Festival",
            event_organizer: "Walton",
            updatedAt: new Date(),
            desc: "The National Science Festival is a significant event in various countries, dedicated and the general public to celebrate and explore various aspects of science and technology. ",
            photo: "../assets/3rd_National_Science_Festival.jpg",
        },
        {
            id: 2,
            title: "George Strait Concert",
            event_organizer: "GS Foundation",
            updatedAt: new Date(),
            desc: "One of the greatest concerts of lifetime",
            photo: "../assets/GeorgeStrait_concert.jpg",
        },
    ];

    return (
        <div className="w-full flex mt-8 space-x-4">
            {events.map((event) => (
                <><div key={event.id} className="w-[35%] h-[200px] flex justify-center items-center">
                    <img src={event.photo} alt="" className="h-full w-full object-cover" />
                </div><div key={event.id} className="flex flex-col w-[65%]">
                        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
                            {event.title}
                        </h1>
                        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
                            <p>@{event.event_organizer}</p>
                            <div className="flex space-x-2 text-sm">
                                <p>{new Date(event.updatedAt).toString().slice(0, 15)}</p>
                                <p>{new Date(event.updatedAt).toString().slice(16, 24)}</p>
                            </div>
                        </div>
                        <p className="text-sm md:text-lg">
                            {event.desc.slice(0, 200) + " ..."}
                        </p>
                    </div></>
            ))}
        </div>
    );
};

export default HomeFeeds;
