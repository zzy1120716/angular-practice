angular.module('angular.directives-load-progress', [])

	.directive('loadProgress', [function() {
		return {
			replace: true,
			compile: function(tplele, tplattr, transclude) {
				if(tplele.length == 1) {
					/*创建画布canvas*/
					var node = tplele[0];
					var width = node.getAttribute('progress-width') || '200';  //获取属性progress-width的值作为宽度，默认200
					var height = node.getAttribute('progress-height') || '200';  //获取属性progress-height的值作为宽度，默认200
					var canvas = document.createElement('canvas');
					canvas.setAttribute('width', width);
					canvas.setAttribute('height', height);
					canvas.setAttribute('progress-model', node.getAttribute('progress-model'));
					node.parentNode.replaceChild(canvas, node);
					/*获取自定义属性或设置为默认值*/
					var ocwidth = node.getAttribute('progress-outer-circle-width') || '20';  //外圈宽度，默认20
					var icwidth = node.getAttribute('progress-inner-circle-width') || '5';  //内圈宽度，默认5
					var ocbcolor = node.getAttribute('progress-outer-circle-background-color') || '#666';  //外圈背景色，默认#666
					var ocfcolor = node.getAttribute('progress-outer-circle-foreground-color') || '#eee';  //外圈前景色，默认#eee
					var iccolor = node.getAttribute('progress-inner-circle-color') || '#666';  //内圈颜色，默认#666
					var lblcolor = node.getAttribute('progress-label-color') || '#eee';  //标签颜色，默认#eee
					var ocradius = node.getAttribute('progress-outer-circle-radius') || '80';  //外圈半径，默认80
					var icradius = node.getAttribute('progress-inner-circle-radius') || '50';  //内圈半径，默认50
					var lblfont = node.getAttribute('progress-label-font') || '30pt Arial';  //标签字体，默认30磅，字体Arial

					return {
						pre: function preLink(scope, instanceElement, instanceAttributes, controller) {
							var expression = canvas.getAttribute('progress-model');
							scope.$watch(expression, function(newValue, oldValue) {
								var ctx = canvas.getContext('2d');
								ctx.clearRect(0, 0, width, height);
								var x = width / 2;
								var y = height / 2;
								/*大圆*/
								ctx.beginPath();
								ctx.arc(x, y, parseInt(ocradius), 0, Math.PI * 2, false);  //画整个外圈圆弧
								ctx.lineWidth = parseInt(ocwidth);  //画笔宽度
								ctx.strokeStyle = ocbcolor;  //外圈填充颜色
								ctx.stroke();
								/*小圆*/
								ctx.beginPath();
								ctx.arc(x, y, parseInt(icradius), 0, Math.PI * 2, false);  //画整个内圈圆弧
								ctx.lineWidth = parseInt(icwidth);  //画笔宽度
								ctx.strokeStyle = iccolor;  //内圈填充颜色
								ctx.stroke();
								/*数字*/
								ctx.font = lblfont;
								ctx.textAlign = 'center';
								ctx.textBaseline = 'middle';
								ctx.fillStyle = lblcolor;
								ctx.fillText(newValue.label, x, y);

								/*进度条部分的外圈圆弧*/
								var startAngle = -(Math.PI /2);
								var endAngle = ((Math.PI * 2) * newValue.percentage) - (Math.PI / 2);
								var anticlockwise = false;
								ctx.beginPath();
								ctx.arc(x, y, parseInt(ocradius), startAngle, endAngle, anticlockwise);
								ctx.lineWidth = parseInt(ocwidth);
								ctx.strokeStyle = ocfcolor;
								ctx.stroke();
								/*进度条部分的内圈圆弧*/
								var startAngle = -(Math.PI /2);
								var endAngle = ((Math.PI * 2) * newValue.percentage) - (Math.PI / 2);
								var anticlockwise = false;
								ctx.beginPath();
								ctx.arc(x, y, parseInt(icradius), startAngle, endAngle, anticlockwise);
								ctx.lineWidth = parseInt(icwidth);
								ctx.strokeStyle = ocfcolor;
								ctx.stroke();
							}, true);
						}
					};
				}
			}
		};
	}]);

angular.module('progress', ['angular.directives-load-progress'])
	.controller('ctrl_progress', ['$scope', '$interval', function($scope, $interval) {
		$scope.ProgressValue = {
			label: 0,
			percentage: 0.00
		};
		$scope.$watch('ProgressValue', function(newValue) {
			newValue.percentage = newValue.label / 100;
		}, true);
		$scope.start = function(t) {
			var i = 0;
			var n = $interval(function() {
				i++;
				$scope.ProgressValue.label = i;
				if(i == 100) {
					$interval.cancel(n);
				}
			}, 500);
		}
	}]);