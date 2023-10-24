/* eslint-disable react/prop-types */

const ProfileOrders = () => {
  // Hardcoded post data
  const event = {
    photo: 'url_to_photo.jpg',
    title: 'Hardcoded Post Title',
    username: 'hardcodeduser',
    updatedAt: new Date().toString(), // You can replace this with your desired date
    desc: 'This is a hardcoded post description. ...Read more',
  };

  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={event.photo} alt="" className="h-full w-full object-cover" />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {event.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{event.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(event.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(event.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {event.desc.slice(0, 200) + ' ...Read more'}
        </p>
      </div>
    </div>
  );
}

export default ProfileOrders;
