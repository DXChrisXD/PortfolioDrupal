<?php


function isosceles_theme_form_system_theme_settings_alter(&$form, \Drupal\Core\Form\FormStateInterface &$form_state, $form_id = NULL) {

  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  $form['settings']['sticky_header'] = array(

      '#type' => 'details',
      '#title' => t('Sticky header'),
      '#open' => TRUE,
  );

  $form['settings']['sticky_header']['sticky_header'] = array(

      '#type' => 'checkbox',
      '#title' => t('Use a static header instead of the sticky header by default'),
      '#default_value' => theme_get_setting('sticky_header', 'isosceles_theme')
  );

  $form['settings']['user_icons'] = array(

      '#type' => 'details',
      '#title' => t('Main menu icons'),
      '#open' => TRUE,
  );

  $form['settings']['user_icons']['user_icons'] = array(

      '#type' => 'checkbox',
      '#title' => t('Hide user icons from the header: log in / user page / log out'),
      '#default_value' => theme_get_setting('user_icons', 'isosceles_theme'),
      '#description' => t('')
  );


}
