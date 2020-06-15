<?php

/**
 * @file
 * Theme and preprocess functions for block.
 */

/**
 * Implements hook_theme_suggestions_block_alter().
 */
function hops_theme_suggestions_block_alter(array &$suggestions, array $variables) {
  // Set bare blocks template.
  $plugin_id = $variables['elements']['#plugin_id'];
  $bare_blocks = ["system_main_block"];
  if (in_array($plugin_id, $bare_blocks)) {
    $suggestions[] = 'block__bare';
  }
}
