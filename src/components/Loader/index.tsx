export function Loader() {
  return (
    <div className='relative z-50 flex items-center justify-center' data-testid='loader'>
      <div className='fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center'>
        <div className='bg-white p-4 rounded-lg shadow-lg'>
          <div className='animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500'></div>
        </div>
      </div>
    </div>
  );
}
