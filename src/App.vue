<template>
  <v-app>
    <v-navigation-drawer width="280" permanent>
      <v-list>
        <v-list-item title="Home" value="home"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <WebletLayout>
        <template #title> Profile Manager </template>
        <template #subtitle> asdasd </template>
        <template #header-actions>asd</template>

        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nemo veniam qui
        accusantium alias perspiciatis distinctio facilis, commodi at sapiente eius quod itaque
        harum vel ullam dignissimos repudiandae quasi eum doloribus tenetur accusamus eveniet.
        Quisquam architecto atque, tempore voluptatem aliquam nulla veritatis a nemo in maiores
        mollitia totam recusandae eligendi expedita soluta laboriosam illo nihil laudantium earum.
        Ex, placeat facere praesentium iste officiis culpa impedit corporis natus quas maiores animi
        consequuntur voluptatum tempore. Voluptatum repellat aperiam mollitia cumque consequuntur
        quam voluptas, temporibus quisquam nesciunt necessitatibus vero. Accusantium suscipit
        ratione, repellendus praesentium enim dolor nesciunt quo, voluptatibus tempora laudantium
        alias, cum veritatis magni doloribus animi ipsum quia cupiditate porro facere. Aut nulla
        beatae ipsam corrupti a incidunt inventore veniam obcaecati assumenda saepe, neque rerum
        explicabo asperiores pariatur accusamus nihil placeat eaque velit magni alias qui odio
        delectus officiis. Nesciunt harum cum doloribus, sit cupiditate dolorem culpa placeat!
        Cupiditate dolorum eius recusandae dolorem ullam dignissimos voluptates, ipsam quisquam!
        Explicabo, numquam similique doloribus at accusamus excepturi quasi! Unde, laboriosam
        dolorum. Blanditiis at necessitatibus incidunt voluptate a neque adipisci voluptas
        voluptates. Officiis, sequi vero? Quasi odit cum exercitationem cupiditate animi totam
        rerum, commodi adipisci! Exercitationem doloremque nam nobis sunt? Rerum maxime officiis qui
        porro vitae hic repellendus doloribus architecto eveniet, ducimus adipisci doloremque a
        quam? Cumque tenetur eos, optio nisi incidunt corrupti alias, ut fugiat quisquam doloremque
        neque? Rem est ea, provident exercitationem dignissimos odio voluptatum hic voluptatibus
        eligendi vitae vero ratione temporibus nemo expedita. Consectetur tempore animi ducimus,
        excepturi minus quam non? Asperiores consectetur quae ullam explicabo qui reiciendis fugit
        veniam ipsa aut, cum quam ab perferendis praesentium dolor minus, maiores, iusto totam vitae
        deserunt? Dolores est quod voluptatem ipsum commodi officia officiis tenetur distinctio
        quos. Voluptatibus, sapiente amet eius labore totam accusamus. Ducimus nemo harum aspernatur
        excepturi error tempore at tempora impedit?

        <template #footer-actions>sad</template>
      </WebletLayout>
      <!-- <ProfileManager /> -->
    </v-main>
  </v-app>
</template>

<script lang="ts" setup></script>

<script lang="ts">
import WebletLayout from './components/weblet_layout.vue'

export default {
  components: {
    WebletLayout
  }
}
</script>
