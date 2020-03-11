// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit tests for the teach page.
 */
import { WindowRef } from 'services/contextual/window-ref.service';

describe('Teach Page', function() {
  var $scope = null, ctrl = null;
  var $timeout = null;
  var SiteAnalyticsService = null;
  var windowRef = new WindowRef();

  beforeEach(angular.mock.module('oppia'));
  beforeEach(angular.mock.module('oppia', function($provide) {
    $provide.value('WindowRef', windowRef);
  }));
  beforeEach(angular.mock.inject(function($injector) {
    $timeout = $injector.get('$timeout');
    SiteAnalyticsService = $injector.get('SiteAnalyticsService');

    var $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    var directive = $injector.get('teachPageDirective')[0];
    ctrl = $injector.instantiate(directive.controller, {
      $rootScope: $scope
    });
  }));

  afterEach(function() {
    // onhashchange and location.hash are reassigned because it shares
    // same memory reference to all test blocks and the controller itself
    // because $provide.value of WindowRef refers to windowRef as well.
    // Once location.hash or onhashchange is setted in the controller,
    // the value will be only available in the test block itself, not affecting
    // others test block.
    windowRef.nativeWindow.onhashchange = null;
    windowRef.nativeWindow.location.hash = '';
  });

  it('should click on teach tab', function(done) {
    var addClassSpy = spyOn($.fn, 'addClass').and.callThrough();
    var removeClassSpy = spyOn($.fn, 'removeClass').and.callThrough();
    var addClassSpyCalls = addClassSpy.calls;
    var removeClassSpyCalls = removeClassSpy.calls;

    ctrl.$onInit();
    expect(addClassSpy).toHaveBeenCalledTimes(0);
    expect(removeClassSpy).toHaveBeenCalledTimes(0);

    ctrl.onTabClick('teach');
    expect(addClassSpy).toHaveBeenCalledTimes(2);
    expect(addClassSpyCalls.all()[0].args[0]).toEqual(
      'oppia-about-tabs-active');
    expect(addClassSpyCalls.all()[1].args[0]).toEqual(
      'oppia-about-visible-content');

    expect(removeClassSpy).toHaveBeenCalledTimes(2);
    expect(removeClassSpyCalls.all()[0].args[0]).toEqual(
      'oppia-about-tabs-active');
    expect(removeClassSpyCalls.all()[1].args[0]).toEqual(
      'oppia-about-visible-content');

    // setTimeout is being used here in order to wait onhashchange event to
    // finish. setTimeout is executed only after call stack is empty.
    // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
    setTimeout(function() {
      expect(windowRef.nativeWindow.location.hash).toBe('#teach');
      // 2 calls for activeTab calls on onTabClick and 2 calls for
      // activeTab calls on $onInit.
      expect(addClassSpy).toHaveBeenCalledTimes(4);
      expect(addClassSpyCalls.all()[2].args[0]).toEqual(
        'oppia-about-tabs-active');
      expect(addClassSpyCalls.all()[3].args[0]).toEqual(
        'oppia-about-visible-content');
      // 2 calls for activeTab calls on onTabClick and 2 calls for
      // activeTab calls on $onInit.
      expect(removeClassSpy).toHaveBeenCalledTimes(4);
      expect(removeClassSpyCalls.all()[2].args[0]).toEqual(
        'oppia-about-tabs-active');
      expect(removeClassSpyCalls.all()[3].args[0]).toEqual(
        'oppia-about-visible-content');
      done();
    });
  });

  it('should click on playbook tab', function(done) {
    var addClassSpy = spyOn($.fn, 'addClass').and.callThrough();
    var removeClassSpy = spyOn($.fn, 'removeClass').and.callThrough();
    var addClassSpyCalls = addClassSpy.calls;
    var removeClassSpyCalls = removeClassSpy.calls;

    ctrl.$onInit();
    expect(addClassSpy).toHaveBeenCalledTimes(0);
    expect(removeClassSpy).toHaveBeenCalledTimes(0);

    ctrl.onTabClick('playbook');
    expect(addClassSpy).toHaveBeenCalledTimes(2);
    expect(addClassSpyCalls.all()[0].args[0]).toEqual(
      'oppia-about-tabs-active');
    expect(addClassSpyCalls.all()[1].args[0]).toEqual(
      'oppia-about-visible-content');

    expect(removeClassSpy).toHaveBeenCalledTimes(2);
    expect(removeClassSpyCalls.all()[0].args[0]).toEqual(
      'oppia-about-tabs-active');
    expect(removeClassSpyCalls.all()[1].args[0]).toEqual(
      'oppia-about-visible-content');

    // setTimeout is being used here in order to wait onhashchange event to
    // finish. setTimeout is executed only after call stack is empty.
    // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
    setTimeout(function() {
      expect(windowRef.nativeWindow.location.hash).toBe('#playbook');
      // 2 calls for activeTab calls on onTabClick and 2 calls for
      // activeTab calls on $onInit.
      expect(addClassSpy).toHaveBeenCalledTimes(4);
      expect(addClassSpyCalls.all()[2].args[0]).toEqual(
        'oppia-about-tabs-active');
      expect(addClassSpyCalls.all()[3].args[0]).toEqual(
        'oppia-about-visible-content');
      // 2 calls for activeTab calls on onTabClick and 2 calls for
      // activeTab calls on $onInit.
      expect(removeClassSpy).toHaveBeenCalledTimes(4);
      expect(removeClassSpyCalls.all()[2].args[0]).toEqual(
        'oppia-about-tabs-active');
      expect(removeClassSpyCalls.all()[3].args[0]).toEqual(
        'oppia-about-visible-content');
      done();
    });
  });

  it('should activate teach tab on init', function() {
    windowRef.nativeWindow.location.hash = '#teach';
    var addClassSpy = spyOn($.fn, 'addClass').and.callThrough();
    var removeClassSpy = spyOn($.fn, 'removeClass').and.callThrough();

    ctrl.$onInit();

    expect(windowRef.nativeWindow.location.hash).toBe('#teach');
    expect(addClassSpy).toHaveBeenCalledTimes(2);
    expect(removeClassSpy).toHaveBeenCalledTimes(2);
  });

  it('should activate playbook tab on init', function() {
    windowRef.nativeWindow.location.hash = '#playbook';
    var addClassSpy = spyOn($.fn, 'addClass').and.callThrough();
    var removeClassSpy = spyOn($.fn, 'removeClass').and.callThrough();

    ctrl.$onInit();

    expect(windowRef.nativeWindow.location.hash).toBe('#playbook');
    expect(addClassSpy).toHaveBeenCalledTimes(2);
    expect(removeClassSpy).toHaveBeenCalledTimes(2);
  });

  it('should get static image url', function() {
    expect(ctrl.getStaticImageUrl('/path/to/image')).toBe(
      '/assets/images/path/to/image');
  });

  it('should apply to teach with oppia', function() {
    var applyToTeachWithOppiaEventSpy = spyOn(
      SiteAnalyticsService, 'registerApplyToTeachWithOppiaEvent')
      .and.callThrough();

    ctrl.$onInit();
    spyOnProperty(windowRef, 'nativeWindow').and.returnValue({
      location: ''
    });
    ctrl.onApplyToTeachWithOppia('/login');
    $timeout.flush(150);

    expect(windowRef.nativeWindow.location).toBe(
      'https://goo.gl/forms/0p3Axuw5tLjTfiri1');
    expect(applyToTeachWithOppiaEventSpy).toHaveBeenCalled();
  });
});
