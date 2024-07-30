<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6"
  >
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-6">
        Welcome to our Secret Santa🎅 App
      </h1>
      <p class="text-base sm:text-lg text-gray-700 mb-6">
        Join the fun and excitement of our Secret Santa app! Easily register
        yourself and your friends, and let our app randomly assign everyone a
        Secret Santa. Click below to get started!
      </p>
      <nuxt-link
        to="/register"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg sm:text-xl font-semibold shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
      >
        Go to Registration
      </nuxt-link>
    </div>
  </div>
</template>
