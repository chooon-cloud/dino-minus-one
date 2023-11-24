// JavaScript source code
class Vehicle extends Phaser.Physics.Arcade.Sprite
{
	direction = 0;
	moveEvent;

	constructor(scene, x, y, texture, frame)
	{
		super(scene, x, y, texture, frame)

		const randomDirection = (exclude) => {
			let newDirection = Phaser.Math.Between(0, 3)
			while (newDirection === exclude)
			{
				newDirection = Phaser.Math.Between(0, 3)
			}

			return newDirection
		}

		this.moveEvent = scene.time.addEvent({
			delay: 2000,
			callback: () => {
				const tileX = myMap.worldToTileX(x);
				const tileY = myMap.worldToTileY(y);
				let tile = myMap.getTileAt(tileX, tileY);
				if(this.direction == 0 && tile.index != 144) this.direction = 1;
				if(this.direction == 1 && tile.index != 144) this.direction = 0;
				if(this.direction == 2 && tile.index != 110) this.direction = 3;
				if(this.direction == 3 && tile.index != 110) this.direction = 2;
			},
			loop: true
		})
		this.direction = randomDirection(this.direction);
	}

	destroy(fromScene)
	{
		this.moveEvent.destroy()

		super.destroy(fromScene)
	}

	preUpdate(t, dt)
	{
		super.preUpdate(t, dt)

		const speed = 25

		switch (this.direction)
		{
			case 0:
				this.setVelocity(0, -speed)
				break

			case 1:
				this.setVelocity(0, speed)
				break

			case 2:
				this.setVelocity(-speed, 0)
				this.setFlipX(true);

				break

			case 3:
				this.setVelocity(speed, 0)
				this.setFlipX(false);
				break
		}
	}
}