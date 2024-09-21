import background from '/low_background.webp';

const style = {
  backgroundImage: `url(${background})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  // filter: 'blur(10px)',
  margin: '0',
  padding: '0',
};

export const Background = () => {
  return (
    <div
      className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 after:block after:h-full after:w-full after:backdrop-blur-sm after:backdrop-brightness-50"
      style={style}
    />
  );
};
