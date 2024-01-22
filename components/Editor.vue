<template>
    <client-only>
      <div class="editor-container">
          <QuillEditor 
              :options="options"
              toolbar="full"
              contentType="html"
              v-model:content="editorData"/>
      </div>
    </client-only>
  </template>
  
  
  <script>
  
  
  export default {
    name: "Editor",
  
  
    async setup() {
      if (!process.server) {
        const { QuillEditor } = await import('@vueup/vue-quill');
        const { vueApp } = useNuxtApp();
        vueApp.component('QuillEditor', QuillEditor);
      }
    },
  
  
    data() {
      return {
        editorData: '',
        options: {
          theme: "snow",
          placeholder: "Write here"
        }
      }
    },
  }
  </script>